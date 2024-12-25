import { Request, Response } from "express";
import { CustomSupabase } from "../config/db_config";

export async function getContactsList(
  req: Request,
  res: Response
): Promise<void> {
  console.log("request", req.body);

  try {
    const { phone } = req.body;
    const phoneArray = phone.split(",").map((e: string) => e.trim());
    const userId = (req as any).user.id;

    if (!phone) {
      res.status(400).json({ error: "Phone number is required" });
      return;
    }

    // Get user by phone number
    const { data: users, error: userError } = await CustomSupabase.from("user")
      .select("id, first_name, last_name, phone_number, profile_image")
      .in("phone_number", phoneArray);

    if (userError) {
      console.log("User error " + userError);
      res.status(500).json({ error: "Error fetching users" });
      return;
    }

    if (!users || users.length === 0) {
      res.status(404).json({ error: "No users found" });
      return;
    }

    // Insert found users into contacts table
    const contactsToInsert = users.map((user) => ({
      user_id: userId,
      phone: user.phone_number,
      name: `${user.first_name} ${user.last_name}`,
      profile_url: user.profile_image,
    }));

    const { data: data, error: insertError } = await CustomSupabase.from(
      "contacts"
    ).insert(
      contactsToInsert
      // {
      //   onConflict: "phone_number",
      // }
    );
    console.log(data);

    if (insertError) {
      console.log("Insert error:", insertError);
      res.status(500).json({ error: "Error saving contacts" });
      return;
    } else {
      console.log("inserted data", data);
    }

    // Return the user details
    res.status(200).json({
      status: 1,
      message: "Contacts saved successfully",
      contacts: users.map((user) => ({
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        phone: user.phone_number,
        profile_image: user.profile_image,
      })),
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
