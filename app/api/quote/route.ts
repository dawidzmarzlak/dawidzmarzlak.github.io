import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      service,
      projectSize,
      name,
      email,
      phone,
      company,
      description,
      budget,
      deadline,
    } = body;

    // Validate required fields
    if (!service || !projectSize || !name || !email) {
      return NextResponse.json(
        { error: "Wszystkie wymagane pola muszą być wypełnione" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Nieprawidłowy format adresu email" },
        { status: 400 }
      );
    }

    // Validate service type
    const validServices = ["nextjs", "wordpress", "woocommerce", "prestashop", "webapp"];
    if (!validServices.includes(service)) {
      return NextResponse.json(
        { error: "Nieprawidłowy typ usługi" },
        { status: 400 }
      );
    }

    // Validate project size
    const validSizes = ["small", "medium", "large", "enterprise"];
    if (!validSizes.includes(projectSize)) {
      return NextResponse.json(
        { error: "Nieprawidłowy rozmiar projektu" },
        { status: 400 }
      );
    }

    // TODO: Here you would typically:
    // 1. Send detailed email notification with quote details
    // 2. Save to database with status "pending"
    // 3. Create task in project management system
    // 4. Send confirmation email with quote number
    // 5. Notify sales team

    console.log("Quote form submission:", {
      service,
      projectSize,
      name,
      email,
      phone,
      company,
      description,
      budget,
      deadline,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate quote reference number (in production, this would be from database)
    const quoteRef = `Q-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Dziękujemy za zapytanie! Wkrótce otrzymasz od nas ofertę.",
        quoteReference: quoteRef,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas wysyłania formularza" },
      { status: 500 }
    );
  }
}
