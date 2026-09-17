const initialProperties = [
  {
    id: 1,
    title: "Modern 2 Bedroom Apartment in Kilimani",
    neighborhood: "Kilimani",
    rentPrice: 85000,
    houseSize: "2 Bed",
    description:
      "A bright and spacious 2-bedroom apartment located in the heart of Kilimani, just minutes from Yaya Centre and the Nairobi CBD. The unit features an open-plan living and dining area, a fully fitted kitchen with modern appliances, built-in wardrobes in both bedrooms, and a private balcony with city views. The building offers 24-hour security, CCTV surveillance, backup generator, ample parking, and a rooftop lounge. Ideal for young professionals or a small family looking for convenience, with supermarkets, restaurants, gyms, and public transport within walking distance.",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    contactPhone: "+254712345678",
    landlord: "James Mwangi",
  },
  {
    id: 2,
    title: "Luxury 3 Bedroom Townhouse in Karen",
    neighborhood: "Karen",
    rentPrice: 220000,
    houseSize: "3 Bed",
    description:
      "An elegant 3-bedroom townhouse set in a quiet, leafy corner of Karen, one of Nairobi's most sought-after suburbs. The home offers a large lounge with a fireplace, a separate dining room, a modern fitted kitchen with a utility area, and a guest powder room downstairs. All three bedrooms are en-suite with quality finishes, and the master bedroom opens onto a private verandah overlooking a landscaped garden. Additional features include a double garage, borehole water, solar backup, and a garden room that can serve as a home office. Close to international schools, the Karen Blixen Museum, and the Carnivore restaurant.",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    contactPhone: "+254722334455",
    landlord: "Amina Hassan",
  },
  {
    id: 3,
    title: "Cozy 1 Bedroom Apartment in Westlands",
    neighborhood: "Westlands",
    rentPrice: 65000,
    houseSize: "1 Bed",
    description:
      "A well-maintained 1-bedroom apartment in Westlands, perfect for a single professional or a couple. The unit includes a comfortable lounge with satellite TV points, a compact fitted kitchen, a bedroom with built-in wardrobes, and a modern bathroom. Residents enjoy 24-hour security, a shared swimming pool, a gym, and reliable elevator access. The location puts you within a short drive of Westgate Mall, Sarit Centre, and numerous office parks, with easy access to Waiyaki Way and public transport. Water and garbage collection are included in the service charge.",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    contactPhone: "+254733445566",
    landlord: "Peter Kamau",
  },
  {
    id: 4,
    title: "Affordable Single Room in Roysambu",
    neighborhood: "Roysambu",
    rentPrice: 18000,
    houseSize: "Single Room",
    description:
      "A clean and secure single room in Roysambu, ideal for students, interns, or anyone on a budget. The room comes with a private bathroom, a small cooking area, and enough space for a bed, desk, and wardrobe. The building is located near Roysambu Market and the Thika Road Superhighway, making commuting to the CBD or surrounding industrial areas quick and affordable. Shared amenities include a common balcony, secure entry gate, and on-site caretaker. Water is available daily, and the area offers plenty of affordable eateries, shops, and matatu stages right at your doorstep.",
    imageUrl:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop",
    contactPhone: "+254744556677",
    landlord: "Grace Wanjiku",
  },
  {
    id: 5,
    title: "Spacious 2 Bedroom Flat in Lavington",
    neighborhood: "Lavington",
    rentPrice: 95000,
    houseSize: "2 Bed",
    description:
      "A beautifully appointed 2-bedroom flat in Lavington, one of Nairobi's most established residential neighborhoods. The apartment features a generous lounge with access to a balcony, a separate dining area, a modern kitchen with granite countertops, and two good-sized bedrooms with built-in wardrobes. The building provides a swimming pool, a children's play area, 24-hour security with intercom entry, and covered parking for one vehicle. Located within walking distance of Lavington Curve and a short drive from Westlands and the CBD, with excellent schools, supermarkets, and cafes nearby.",
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
    contactPhone: "+254755667788",
    landlord: "David Ochieng",
  },
  {
    id: 6,
    title: "Family 3 Bedroom Apartment in Kileleshwa",
    neighborhood: "Kileleshwa",
    rentPrice: 110000,
    houseSize: "3 Bed",
    description:
      "A spacious 3-bedroom family apartment in Kileleshwa, offering comfort and convenience in a peaceful residential setting. The unit includes a large lounge and dining area, a fitted kitchen with plenty of storage, a utility room, and three bedrooms with built-in wardrobes, the master being en-suite. The property sits in a secure apartment block with a backup generator, borehole water, 24-hour guards, and dedicated parking. Kileleshwa is known for its proximity to international schools, the Arboretum, and easy access to both the CBD and Westlands, making it a favorite for families and expatriates.",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    contactPhone: "+254766778899",
    landlord: "Mary Njeri",
  },
  {
    id: 7,
    title: "Stylish 1 Bedroom Studio in Kilimani",
    neighborhood: "Kilimani",
    rentPrice: 55000,
    houseSize: "1 Bed",
    description:
      "A stylish 1-bedroom studio apartment in Kilimani, designed for modern urban living. The open-plan space includes a comfortable sleeping area, a lounge corner, and a well-equipped kitchenette with a fridge, cooker, and microwave. The building offers high-speed elevator access, 24-hour security, a rooftop terrace with views of the Nairobi skyline, and a small gym. Located on Argwings Kodhek Road, you are steps away from popular cafes, restaurants, and nightlife, with easy access to the CBD and Upper Hill business districts.",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    contactPhone: "+254777889900",
    landlord: "John Kiptoo",
  },
  {
    id: 8,
    title: "Executive 2 Bedroom Apartment in Westlands",
    neighborhood: "Westlands",
    rentPrice: 120000,
    houseSize: "2 Bed",
    description:
      "An executive 2-bedroom apartment in a premium Westlands high-rise, perfect for professionals who want to be at the center of Nairobi's business and entertainment hub. The unit features floor-to-ceiling windows with stunning city views, a designer kitchen with quartz countertops and stainless steel appliances, a spacious lounge with a smart TV, and two en-suite bedrooms with premium furnishings. Building amenities include a heated swimming pool, a fully equipped gym, a sauna, concierge service, and secure underground parking. Walking distance to Westgate Mall, Village Market, and major office towers.",
    imageUrl:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop",
    contactPhone: "+254788990011",
    landlord: "Sarah Akinyi",
  },
];

export { initialProperties };
export default initialProperties;
