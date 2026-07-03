"use client"

import type React from "react"
import { Phone, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Clock, MapPin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function Home() {
  console.log("[v0] Home component is rendering")

  const [showCallPopup, setShowCallPopup] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("lunch")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCategoryImages, setCurrentCategoryImages] = useState<string[]>([])
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isPinching, setIsPinching] = useState(false)
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [galleryTouchStart, setGalleryTouchStart] = useState(0)
  const [galleryTouchEnd, setGalleryTouchEnd] = useState(0)

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Taste of Asia",
      image: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image0-diIlQYXGj0wajyLZNNdFIisrUE5Z5i.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1-hDnA8Wsi63fKTYigvpvLZ812SmTzKl.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-QoVvjLmSNrFTdQfc5G33F4WBhCOfhP.jpeg",
      ],
      "@id": "https://tasteofasia.se",
      url: "https://tasteofasia.se",
      telephone: "+46533-16368",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Östra Storgatan 7-9",
        addressLocality: "Säffle",
        addressCountry: "SE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 59.1333,
        longitude: 12.9333,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "11:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "12:00",
          closes: "21:00",
        },
      ],
      servesCuisine: ["Asian", "Chinese", "Thai", "Sushi"],
      menu: "https://tasteofasia.se#menu",
      acceptsReservations: "True",
      email: "tasteofasia2024@gmail.com",
      description:
        "Autentisk asiatisk mat i hjärtat av Säffle. Vi serverar kinesisk mat, thailändsk mat, sushi och mer med färska ingredienser.",
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const restaurantImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image0-diIlQYXGj0wajyLZNNdFIisrUE5Z5i.jpeg",
      alt: "Restaurangens matsal med varma lampor och träbord",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1-hDnA8Wsi63fKTYigvpvLZ812SmTzKl.jpeg",
      alt: "Restaurangens interiör med körsbärsblommor",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-QoVvjLmSNrFTdQfc5G33F4WBhCOfhP.jpeg",
      alt: "Vy från baren med tulpaner och glas",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image4-DfJPCO3yOYqVnq9GoWXOzFCz0WpgVv.jpeg",
      alt: "Mysigt hörn med asiatisk väggkonst",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image3-SmpioHWXbiwIxc9jIi0C0rNd0ZSJyt.jpeg",
      alt: "Bred vy av restaurangen",
    },
  ]

  const handleGalleryTouchStart = (e: React.TouchEvent) => {
    setGalleryTouchStart(e.touches[0].clientX)
  }

  const handleGalleryTouchMove = (e: React.TouchEvent) => {
    setGalleryTouchEnd(e.touches[0].clientX)
  }

  const handleGalleryTouchEnd = () => {
    if (!galleryTouchStart || !galleryTouchEnd) return
    const distance = galleryTouchStart - galleryTouchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && galleryIndex < restaurantImages.length - 1) {
      setGalleryIndex(galleryIndex + 1)
    }
    if (isRightSwipe && galleryIndex > 0) {
      setGalleryIndex(galleryIndex - 1)
    }

    setGalleryTouchStart(0)
    setGalleryTouchEnd(0)
  }

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isMobile()) {
      window.location.href = "tel:0533-16368"
    } else {
      setShowCallPopup(true)
    }
  }

  const openLightbox = (images: string[], index: number) => {
    setCurrentCategoryImages(images)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    setZoomLevel(1)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setZoomLevel(1)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentCategoryImages.length - 1 : prev - 1))
    setZoomLevel(1)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === currentCategoryImages.length - 1 ? 0 : prev + 1))
    setZoomLevel(1)
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStartZoom = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsPinching(true)
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      setInitialPinchDistance(distance)
    } else if (e.touches.length === 1) {
      setTouchStart(e.touches[0].clientX)
    }
  }

  const handleTouchMoveZoom = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching) {
      const distance = getTouchDistance(e.touches[0], e.touches[1])
      const scale = distance / initialPinchDistance
      setZoomLevel((prev) => Math.min(Math.max(prev * scale, 1), 3))
      setInitialPinchDistance(distance)
    } else if (e.touches.length === 1 && !isPinching) {
      setTouchEnd(e.touches[0].clientX)
    }
  }

  const handleTouchEndZoom = () => {
    if (isPinching) {
      setIsPinching(false)
    } else {
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > 50
      const isRightSwipe = distance < -50

      if (isLeftSwipe) {
        goToNext()
      }
      if (isRightSwipe) {
        goToPrevious()
      }
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "+" || e.key === "=") zoomIn()
      if (e.key === "-") zoomOut()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, currentImageIndex, currentCategoryImages])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [lightboxOpen])

  const menuCategories = {
    lunch: {
      title: "Lunch Buffé",
      description: "Vår populära lunchbuffé med 10-13 olika varmrätter, sushi och mer",
      type: "images" as const,
      images: [
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thumbnail_Buffe%20fo%CC%88nster-Wwk82m93TIXBDz9ihCzGFULH0wkq5e.jpg",
          alt: "Lunchbuffé Måndag-Fredag 12:00-14:30",
        },
        {
          src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/thumbnail_Helgbuffe%20fo%CC%88nster-F4FGpJPUXD7a43Qe4gjrFPjnUkyoL0.jpg",
          alt: "Helgbuffé Lördag-Söndag 12:00-15:00",
        },
      ],
    },
    takeaway: {
      title: "Avhämtningsmeny",
      description: "Beställ och hämta - perfekt för att njuta hemma",
      type: "text" as const,
      sections: [
        {
          title: "Kombinationsmenyer",
          description: "Meny A & Meny B innehåller vitlök",
          items: [
            {
              name: "Meny A - Combination plates A",
              price: "149:-",
              description:
                "Kyckling grillspett med jordnötssås (2st) • Panerade räkor med sötsursås (2st) • Oxfilé med vitlökschili & stark basilika 🌶️🌶️🌶️",
            },
            {
              name: "Meny B - Combination plates B",
              price: "149:-",
              description:
                "Vårrulle (blandfärs) (1st) • Kyckling grillspett med jordnötssås (2st) • Friterade räkor med sötsursås (2st) • Kycklingfilé med vitlökschili & stark basilika 🌶️🌶️🌶️",
            },
            {
              name: "Meny C - Combination plates C",
              price: "139:-",
              description:
                "Vårrullar (blandfärs) (2st) • Kyckling grillspett med jordnötssås (2st) • Friterade räkor med sötsursås (2st)",
            },
          ],
        },
        {
          title: "Förrätter",
          items: [
            { name: "F1. Vårrullar (2st) (blandfärs)", price: "54:-" },
            { name: "F2. Räksoppa med kokos, limeblad 🌶️🌶️", price: "65:-" },
            { name: "F3. Kycklingsoppa med kokos, limeblad 🌶️🌶️", price: "59:-" },
            { name: "F5. Friterade krabbklor (4st) (innehåller surimi)", price: "54:-" },
            { name: "F7. Panerade räkor (3st)", price: "65:-" },
            { name: "F8. Friterade små vårrullar (8st)", price: "54:-" },
          ],
        },
        {
          title: "Kycklingrätter",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            { name: "4. Kyckling grillspett med jordnötssås", price: "119:-" },
            { name: "7. Kycklingfilé vitlök/chili & stark basilika 🌶️🌶️🌶️", price: "119:-" },
            { name: "8. Kycklingfilé panang curry, kokos & limeblad 🌶️🌶️🌶️", price: "119:-" },
            { name: "9. Kycklingfilé gul curry, kokos & ananas", price: "119:-" },
            { name: "10. Kycklingfilé röd curry, kokos, ananas & söt basilika 🌶️🌶️", price: "119:-" },
            { name: "11. Kycklingfilé massaman curry, kokos & jordnötter", price: "119:-" },
            { name: "12. Kycklingfilé med vitlök & grönsaker", price: "119:-" },
            { name: "35. Kycklingfilé sweetchilisås, vitlök & cashewnötter", price: "125:-" },
            { name: "41. Kycklingfilé ingefära, vitlök & cashewnötter", price: "125:-" },
            { name: "50. Krispig kyckling med grönsaker & sweetchilisås", price: "129:-" },
            { name: "51. Kycklingfilé med grönsaker & BBQ-sås cashewnötter", price: "129:-" },
            { name: "55. Kycklingfilé chilipasta, vitlök, kokos & champinjoner 🌶️🌶️", price: "125:-" },
            { name: "88. Kycklingfilé med grön curry, kokos & ananas 🌶️🌶️🌶️", price: "119:-" },
            { name: "89. Kycklingfilé med vitlöksvarpepparsås 🌶️🌶️", price: "125:-" },
          ],
        },
        {
          title: "Oxkött",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            { name: "14. Biff med röd curry, kokos & söt basilika 🌶️🌶️", price: "129:-" },
            { name: "15. Biff med panang curry, kokos & limeblad 🌶️🌶️🌶️", price: "129:-" },
            { name: "16. Biff med massaman curry, kokos & jordnötter", price: "129:-" },
            { name: "32. Biff med bambuskott & vitlök", price: "129:-" },
            { name: "34. Biff med sweetchilisås, vitlök & cashewnötter", price: "135:-" },
            { name: "36. Biff med vitlöksvarpepparsås 🌶️🌶️", price: "135:-" },
            { name: "43. Biff med vitlök & grönsaker", price: "129:-" },
            { name: "44. Biff med chilipasta, vitlök, kokos & champinjoner 🌶️🌶️", price: "135:-" },
            { name: "68. Biff med grön curry 🌶️🌶️🌶️", price: "129:-" },
            { name: "77. Biff vitlök/chili & stark basilika 🌶️🌶️🌶️", price: "129:-" },
          ],
        },
        {
          title: "Specialrätter",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            { name: "42. Skaldjur med vitlöksvarpepparsås (tigerräkor, bläckfisk & musslor) 🌶️🌶️", price: "175:-" },
            {
              name: "45. Skaldjur med vitlökschili & stark basilika (tigerräkor, bläckfisk & musslor) 🌶️🌶️🌶️",
              price: "175:-",
            },
            { name: "46. Fläskfilé med vitlöksvarpepparsås 🌶️🌶️", price: "165:-" },
            { name: "47. Ankfilé med vitlökschili & stark basilika 🌶️🌶️🌶️", price: "175:-" },
            { name: "48. Ankfilé med vitlöksvarpepparsås & koriander 🌶️🌶️", price: "175:-" },
            { name: "53. Fläskfilé med vitlökschili & stark basilika 🌶️🌶️🌶️", price: "165:-" },
            { name: "56. Fläskfilé chilipasta, vitlök, kokos & champinjoner 🌶️🌶️", price: "165:-" },
            { name: "59. Oxfilé med vitlökschili & stark basilika 🌶️🌶️🌶️", price: "195:-" },
            { name: "60. Mix med vitlökschili & stark basilika (oxfilé, tigerräkor & kyckling) 🌶️🌶️🌶️", price: "175:-" },
            { name: "61. Mix med röd curry, kokos & söt basilika (oxfilé, tigerräkor & kyckling) 🌶️🌶️", price: "175:-" },
            {
              name: "62. Skaldjur med röd curry, kokos & söt basilika (tigerräkor, bläckfisk & musslor) 🌶️🌶️",
              price: "175:-",
            },
            { name: "63. Mix med vitlöksvarpepparsås (oxfilé, tigerräkor & kyckling) 🌶️🌶️", price: "175:-" },
          ],
        },
        {
          title: "Räkor",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            { name: "17. Tigerräkor med gul curry, kokos & ananas", price: "139:-" },
            { name: "18. Tigerräkor med vitlök/chili & stark basilika 🌶️🌶️🌶️", price: "139:-" },
            { name: "19. Tigerräkor chilipasta, vitlök, kokos & champinjoner 🌶️🌶️", price: "139:-" },
            { name: "57. Tigerräkor med röd curry, kokos & söt basilika 🌶️🌶️", price: "139:-" },
            { name: "58. Tigerräkor med sweetchilisås & vitlök,cashewnötter", price: "139:-" },
            { name: "65. Tigerräkor med panang curry, kokos, limeblad 🌶️🌶️🌶️", price: "139:-" },
            { name: "76. Tigerräkor med grön curry, kokos & ananas 🌶️🌶️🌶️", price: "139:-" },
            { name: "78. Tigerräkor med vitlök & grönsaker", price: "139:-" },
            { name: "79. Tigerräkor med vitlöksvarpepparsås 🌶️🌶️", price: "145:-" },
            { name: "80. Tigerräkor med ingefära & vitlök", price: "139:-" },
          ],
        },
        {
          title: "Grönsaker",
          description: "Alla rätter innehåller vitlök – ej vegetariska",
          items: [
            { name: "21. Stekta grönsaker med vitlök & ostronsås", price: "118:-" },
            { name: "22. Grönsaker med panang curry, kokos & limeblad 🌶️🌶️🌶️", price: "118:-" },
            { name: "22R. Grönsaker med röd curry, kokos, ananas & söt basilika 🌶️🌶️", price: "118:-" },
            { name: "22G. Grönsaker med grön curry, kokos, ananas & limeblad 🌶️🌶️🌶️", price: "118:-" },
            { name: "22M. Grönsaker med massaman curry & kokos,jordnötter", price: "118:-" },
            { name: "23V. Stekt ris med ägg & grönsaker", price: "118:-" },
            { name: "24V. Stekta äggnudlar med grönsaker", price: "118:-" },
            { name: "25V. Risnudlar med ägg, grönsaker & jordnötter", price: "118:-" },
            { name: "27. Grönsaker med gul curry, kokos & ananas", price: "118:-" },
            { name: "33. Stekta grönsaker med vitlök & sweetchilisås", price: "118:-" },
          ],
        },
        {
          title: "Ris – Nudlar – Friterad",
          items: [
            { name: "13. Friterad kycklingfilé med sötsursås (11st)", price: "119:-" },
            { name: "20. Friterade tigerräkor med sötsursås (8st)", price: "139:-" },
            { name: "23. Stekt ris med ägg, kyckling, räkor, grönsaker", price: "128:-" },
            { name: "24. Stekta äggnudlar med kyckling, räkor, grönsaker", price: "128:-" },
            { name: "25. Risnudlar med ägg, kyckling, räkor, grönsaker", price: "132:-" },
            { name: "26. Friterade mix (4st tigerräkor & 6st kyckling) med sötsursås", price: "135:-" },
            { name: "28. Pad Thai med grönsaker, kyckling, räkor & jordnötter", price: "132:-" },
          ],
        },
        {
          title: "Veganska rätter",
          description: "Alla rätter innehåller vitlök",
          items: [
            { name: "100. Grönsaker med sojasås & tofu", price: "118:-" },
            { name: "101. Grönsaker med sweetchilisås & tofu", price: "118:-" },
            { name: "102. Grönsaker med ingefärasås & tofu", price: "118:-" },
            { name: "103. Grönsaker med vitlökschilisås & tofu 🌶️🌶️🌶️", price: "118:-" },
            { name: "104. Grönsaker med sötsursås & tofu", price: "118:-" },
            { name: "105. Risnudlar med grönsaker, tofu & jordnötter", price: "118:-" },
            { name: "106. Grönsaker med sweetchilisås & tofu", price: "118:-" },
            { name: "107. Grönsaker med vitlöksvartpepparssås & tofu 🌶️🌶️", price: "118:-" },
            { name: "108. Grönsaker med citrongräs & tofu 🌶️🌶️", price: "118:-" },
          ],
        },
        {
          title: "Sushi",
          description: (
            <>
              <span className="font-bold underline decoration-2 decoration-amber-400 underline-offset-4">
                Minst 8 bitar
              </span>{" "}
              • 12:- per bit • Välj upp till 4 typer
            </>
          ),
          items: [
            { name: "Lax", price: "12:-/bit" },
            { name: "Räkor", price: "12:-/bit" },
            { name: "Maki skaldjur", price: "12:-/bit" },
            { name: "Maki vegetariska", price: "12:-/bit" },
            { name: "Maki kyckling", price: "12:-/bit" },
            { name: "Avokado", price: "12:-/bit" },
            { name: "Tofu", price: "12:-/bit" },
            { name: "Ägg", price: "12:-/bit" },
            { name: "Krabba", price: "12:-/bit" },
            { name: "Bläckfisk", price: "12:-/bit" },
          ],
        },
        {
          title: "Tillbehör",
          items: [
            { name: "Med nudlar", price: "35:-" },
            { name: "Extra nudlar", price: "55:-" },
            { name: "Med stekt ris", price: "35:-" },
            { name: "Extra stekt ris", price: "55:-" },
            { name: "Extra ris", price: "25:-" },
            { name: "Extra cashewnötter", price: "15:-" },
            { name: "Såser: Mellan", price: "15:-" },
            { name: "Såser: Stor", price: "25:-" },
            { name: "Med pommes", price: "35:-" },
            { name: "Extra pommes", price: "55:-" },
            { name: "Läsk: 33 cl", price: "20:-" },
          ],
        },
      ],
    },
    dinein: {
      title: "Serveringsmeny",
      description: "Fullständig meny för servering i restaurangen",
      type: "text" as const,
      sections: [
        {
          title: "Förrätter / Appetizers",
          items: [
            { name: "F1. Vårrullar m. blandfärs (2st) / Egg Rolls (mixed mince) (2 piece)", price: "54:-" },
            {
              name: "F2. Räksoppa med kokos & limeblad 🌶️🌶️ / Shrimp soup with coconut milk and lime juice",
              price: "65:-",
            },
            {
              name: "F3. Kycklingsoppa med kokos & limeblad 🌶️🌶️ / Chicken soup with coconut milk and lime juice",
              price: "59:-",
            },
            {
              name: "F5. Friterade krabbklor (4st) innehåller surimi / Fried Crab Claws (4 piece) contains surimi",
              price: "54:-",
            },
            { name: "F7. Panerade räkor (3st) / Breaded prawns (3 piece)", price: "65:-" },
            { name: "F8. Friterade små vårrullar (8st) / Fried small egg rolls (8 piece)", price: "54:-" },
          ],
        },
        {
          title: "Sushi",
          description: (
            <>
              <span className="font-bold underline decoration-2 decoration-amber-400 underline-offset-4">
                Minst 8 bitar
              </span>{" "}
              • Välj upp till 4 typer
            </>
          ),
          items: [
            { name: "Lax / Salmon", price: "12:-/bit" },
            { name: "Räkor / Shrimp", price: "12:-/bit" },
            { name: "Maki Skaldjur / Maki Seafood", price: "12:-/bit" },
            { name: "Maki Vegetarisk / Maki Vegetarian", price: "12:-/bit" },
            { name: "Maki Kyckling / Maki Chicken", price: "12:-/bit" },
            { name: "Avokado / Avocado", price: "12:-/bit" },
            { name: "Tofu", price: "12:-/bit" },
            { name: "Ägg / Egg", price: "12:-/bit" },
            { name: "Krabba / Crab", price: "12:-/bit" },
            { name: "Bläckfisk / Squid", price: "12:-/bit" },
          ],
        },

        {
          title: "Kycklingrätter / Chicken dishes",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            { name: "4. Kyckling grillspett med jordnötssås / Chicken skewers with peanut sauce", price: "139:-" },
            {
              name: "7. Kycklingfilé med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic chicken with vegetables & thai basil",
              price: "139:-",
            },
            {
              name: "8. Kycklingfilé med panang curry kokos & limeblad 🌶️🌶️🌶️ / Chicken with panang curry, coconut & lime leaves",
              price: "139:-",
            },
            {
              name: "9. Kycklingfilé med gul curry kokos, blomkål & ananas / Chicken with yellow curry, coconut & pineapple",
              price: "139:-",
            },
            {
              name: "10. Kycklingfilé med röd curry kokos & söt basilika 🌶️🌶️ / Chicken with red curry, coconut & sweet basil",
              price: "139:-",
            },
            {
              name: "11. Kycklingfilé med massaman curry kokos & jordnötter / Chicken with massaman curry, coconut & peanuts",
              price: "139:-",
            },
            { name: "12. Kycklingfilé med grönsaker / Chicken with vegetables", price: "139:-" },
            {
              name: "35. Kycklingfilé med sweetchilisås & cashewnötter / Chicken with sweet chili sauce & cashew nuts",
              price: "145:-",
            },
            {
              name: "41. Kycklingfilé med ingefära & cashewnötter / Chicken with ginger & cashew nuts",
              price: "145:-",
            },
            {
              name: "50. Krispig kycklingfilé med sweetchilisås / Crispy chicken with sweet chili sauce",
              price: "149:-",
            },
            {
              name: "51. Kycklingfilé med BBQ sås & cashewnötter / Chicken with BBQ sauce & cashew nuts",
              price: "149:-",
            },
            {
              name: "55. Kycklingfilé med chilipasta kokos & champinjoner 🌶️🌶️ / Chicken with chili paste, coconut & mushrooms",
              price: "145:-",
            },
            {
              name: "88. Kycklingfilé med grön curry kokos & limeblad 🌶️🌶️🌶️ / Chicken with green curry, coconut & lime leaves",
              price: "139:-",
            },
            {
              name: "89. Kycklingfilé med vitlöksvartpepparssås 🌶️🌶️ / Chicken with garlic & black pepper sauce & coriander",
              price: "145:-",
            },
          ],
        },
        {
          title: "Barnmeny / Children's menu",
          items: [
            {
              name: "72. Kyckling grillspett med jordnötssås & ris / Chicken skewers with peanut sauce & rice",
              price: "79:-",
            },
            {
              name: "73. Friterad kyckling med sötsursås & ris / Fried chicken with sweet sour sauce & rice",
              price: "79:-",
            },
          ],
        },
        {
          title: "Oxkött / Beef plates",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            {
              name: "14. Biff med röd curry kokos & söt basilika 🌶️🌶️ / Beef with red curry, coconut & sweet basil",
              price: "149:-",
            },
            {
              name: "15. Biff med panang curry kokos & limeblad 🌶️🌶️🌶️ / Beef with panang curry, coconut & lime leaves",
              price: "149:-",
            },
            {
              name: "16. Biff med massaman curry kokos & jordnötter / Beef with massaman curry, coconut & peanuts",
              price: "149:-",
            },
            { name: "32. Biff med bambuskott / Beef with bamboo shoots", price: "149:-" },
            {
              name: "34. Biff med sweetchilisås & cashewnötter / Beef with sweet chili sauce & cashew nuts",
              price: "155:-",
            },
            {
              name: "36. Biff med vitlöksvartpepparssås 🌶️🌶️ / Beef with garlic & black pepper sauce",
              price: "155:-",
            },
            { name: "43. Biff med grönsaker / Beef with vegetables", price: "149:-" },
            {
              name: "44. Biff med chilipasta kokos & champinjoner 🌶️🌶️ / Beef with chili paste, coconut & mushrooms",
              price: "155:-",
            },
            {
              name: "68. Biff med grön curry kokos & ananas 🌶️🌶️🌶️ / Beef with green curry, coconut & lime leaves",
              price: "149:-",
            },
            {
              name: "77. Biff med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic beef with vegetables & thai basil",
              price: "149:-",
            },
          ],
        },
        {
          title: "Räkor / Prawns dishes",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [ 
            {
              name: "17. Räkor med gul curry kokos & ananas/ Prawns with yellow curry, coconut & sweet pineapple",
              price: "159:-",
            },
            {
              name: "18. Räkor med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic prawns with vegetables & thai basil",
              price: "159:-",
            },
            { 
              name: "19. Räkor med chilipasta kokos & champinjoner 🌶️🌶️ / Prawns with chili paste, coconut & mushrooms",
              price: "159:-",
            },
            { 
              name: "57. Räkor med röd curry kokos & söt basilika 🌶️🌶️ / Prawns with red curry, coconut & sweet basil",
              price: "159:-",
            },
            { 
              name: "58. Räkor med sweetchilisås & cashewnötter / Prawns with sweet chili sauce & cashew nuts",
              price: "159:-",
            },
            { 
              name: "65. Räkor med panang curry kokos & limeblad 🌶️🌶️🌶️ / Prawns with panang curry, coconut & lime leaves",
              price: "159:-",
            },
            {
              name: "76. Räkor med grön curry kokos & ananas 🌶️🌶️🌶️ / Prawns with green curry, coconut & lime leaves",
              price: "159:-",
            },
            { name: "78. Räkor med grönsaker / Prawns with vegetables", price: "159:-" },
            {
              name: "79. Räkor med vitlöksvartpepparssås 🌶️🌶️ / Prawns with garlic & black pepper sauce",
              price: "165:-",
            },
              name: "80. Räkor med ingefära & grönsaker / Prawns with ginger & vegetables",
              price: "159:-",
            },
          ],
        },
        { 
          title: "Ris - Nudlar - Friterat / Rice - Noodles - Fried plates",
          items: [
            {
              name: "13. Friterad kycklingfilé (11st) sötsursås / Fried chicken with sweet sour sauce",
              price: "139:-",
            },
            { name: "20. Friterade tigerräkor (8st) sötsursås / Fried prawns with sweet sour sauce", price: "159:-" },
            {
              name: "23. Stekt ris med kyckling & räkor, grönsaker / Fried rice with chicken & shrimps, vegetables",
              price: "148:-",
            },
            {
              name: "24. Stekta äggnudlar med kyckling & räkor / Fried egg noodles with chicken & shrimps",
              price: "148:-",
            },
            {
              name: "25. Risnudlar kyckling, räkor & grönsaker / Rice noodles with chicken, shrimps & vegetables",
              price: "152:-",
            },
            {
              name: "26. Friterade mix (kyckling & räkor) med sötsursås / Fried mix (chicken & prawns) with sweet sour sauce",
              price: "155:-",
            },
            {
              name: "28. Pad Thai med grönsaker kyckling, räkor & jordnötter / Pad Thai with vegetabled chicken, shrimps & peanuts",
              price: "152:-",
            },
          ],
        },
        {
          title: "Grönsaker / Vegetables",
          description: "Alla rätter innehåller vitlök • Vissa rätter innehåller räkpaste & fisksås",
          items: [
            { name: "21. Stekta grönsaker med ostronsås / Vegetables with oyster sauce", price: "138:-" },
            {
              name: "22. Grönsaker med panang curry kokos & limeblad 🌶️🌶️🌶️ / Vegetables with panang curry, coconut & lime leaves",
              price: "138:-",
            },
            {
              name: "22R. Grönsaker med röd curry kokos & söt basilika 🌶️🌶️ / Vegetables with red curry, coconut & sweet basil",
              price: "138:-",
            },
            {
              name: "22G. Grönsaker med grön curry kokos & limeblad 🌶️🌶️🌶️ / Vegetables with green curry, coconut & lime leaves",
              price: "138:-",
            },
            {
              name: "22M. Grönsaker med massaman curry kokos & jordnötter / Vegetables with massaman curry, coconut & peanuts",
              price: "138:-",
            },
            { name: "23V. Stekt ris med ägg, grönsaker / Fried rice with egg, vegetables", price: "138:-" },
            { name: "24V. Stekta äggnudlar med grönsaker / Fried egg noodles with vegetables", price: "138:-" },
            { name: "33. Grönsaker med sweetchilisås / Vegetables with sweet chili sauce", price: "138:-" },
            {
              name: "25V. Risnudlar med grönsaker & jordnötter / Fried rice noodles with vegetables & peanuts",
              price: "138:-",
            },
            {
              name: "27. Grönsaker med gul curry kokos & ananas / Vegetables with yellow curry, coconut & pineapple",
              price: "138:-",
            },
          ],
        },
        {
          title: "Veganska rätter / Vegan Plates",
          description: "Alla rätter innehåller vitlök",
          items: [
            { name: "100. Grönsaker med sojasås & tofu / Vegetables with soy sauce & tofu", price: "118:-" },
            {
              name: "101. Grönsaker med sweetchilisås & tofu / Vegetables with sweet chili sauce & tofu",
              price: "118:-",
            },
            { name: "102. Grönsaker med ingefärasås & tofu / Vegetables with ginger sauce & tofu", price: "118:-" },
            {
              name: "103. Grönsaker med vitlökschilisås & tofu 🌶️🌶️🌶️ / Vegetables with spicy garlic & tofu",
              price: "118:-",
            },
            { name: "104. Grönsaker med sötsursås & tofu / Vegetables with sweet sour sauce & tofu", price: "118:-" },
            {
              name: "105. Risnudlar med grönsaker, tofu & jordnötter / Fried rice noodles with vegetables, tofu & peanuts",
              price: "118:-",
            },
            {
              name: "106. Grönsaker med sweetchilisås & tofu / Vegetables with sweet chili sauce & tofu",
              price: "118:-",
            },
            {
              name: "107. Grönsaker med vitlöksvartpepparssås & tofu 🌶️🌶️ / Vegetables with garlic and black pepper sauce & tofu",
              price: "118:-",
            },
            {
              name: "108. Grönsaker med citrongräs & tofu 🌶️🌶️ / Vegetables with lemon grass & tofu",
              price: "118:-",
            },
          ],
        },
        {
          title: "Specialrätter / Special Plates",
          description: "Alla rätter innehåller grönsaker & vitlök",
          items: [
            {
              name: "42. Skaldjur med vitlöksvartpepparssås & koriander 🌶️🌶️ (Tigerräkor, Bläckfisk & Musslor) / Seafood with vegetables, garlic and black pepper sauce",
              price: "195:-",
            },
            {
              name: "45. Skaldjur med vitlökschili & stark basilika 🌶️🌶️🌶️ (Tigerräkor, Bläckfisk & Musslor) / Spicy garlic seafood with vegetables & thai basil",
              price: "195:-",
            },
            {
              name: "46. Fläskfilé med vitlöksvartpepparssås & koriander 🌶️🌶️ / Pork filet with garlic & black pepper sauce & coriander",
              price: "185:-",
            },
            {
              name: "47. Ankfilé med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic duck with vegetables & thai basil",
              price: "195:-",
            },
            {
              name: "48. Ankfilé med vitlöksvartpepparsås & koriander 🌶️🌶️ / Duck with vegetables, garlic and black pepper sauce & coriander",
              price: "195:-",
            },
            {
              name: "53. Fläskfilé med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic pork filet with vegetables & thai basil",
              price: "185:-",
            },
            {
              name: "56. Fläskfilé med chilipasta kokos & champinjoner 🌶️🌶️ / Pork filet with chili paste, coconut & mushrooms",
              price: "185:-",
            },
            {
              name: "59. Oxfilé med vitlökschili & stark basilika 🌶️🌶️🌶️ / Spicy garlic beef tenderloin with vegetables & thai basil",
              price: "215:-",
            },
            {
              name: "60. Mix med vitlökschili & stark basilika 🌶️🌶️🌶️ (Oxfilé, Tigerräkor & Kyckling) / Spicy garlic mix with vegetables & thai basil",
              price: "195:-",
            },
            {
              name: "61. Mix med röd curry kokos & söt basilika 🌶️🌶️ (Oxfilé, Tigerräkor & Kyckling) / Mix with red curry, coconut & sweet basil",
              price: "195:-",
            },
            {
              name: "62. Skaldjur med röd curry kokos & söt basilika 🌶️🌶️ (Tigerräkor, Bläckfisk & Musslor) / Seafood with red curry, coconut & sweet basil",
              price: "195:-",
            },
            {
              name: "63. Mix med vitlöksvartpepparssås & koriander 🌶️🌶️ (Oxfilé, Tigerräkor & Kyckling) / Mix with vegetables, garlic and black pepper sauce & coriander",
              price: "195:-",
            },
            {
              name: "66. Grillad fläskfilé med pommes & bearnaisesås / Grilled pork filet with fries & bearnaise sauce",
              price: "195:-",
            },
            {
              name: "67. Grillad Oxfilé med pommes & bearnaisesås / Grilled beef tenderloin with fries & bearnaise sauce",
              price: "220:-",
            },
          ],
        },
        {
          title: "Efterrätt / Dessert",
          items: [
            { name: "83. Friterad ananas med glass / Fried pineapple with ice cream", price: "55:-" },
            { name: "84. Friterad persika med glass / Fried peach with ice cream", price: "55:-" },
            { name: "85. Friterad banan med glass / Fried banana with ice cream", price: "55:-" },
            { name: "86. Glass med sås & kex / Ice cream with sauce & biscuit", price: "55:-" },
          ],
        },
        {
          title: "Drycker / Drinks",
          items: [
            { name: "Läsk/lätt öl", price: "25:-" },
            { name: "Pepsi Zingo • 7up Pepsi Max • Ramlösa", price: "" },
            { name: "Lime, Naturell, Granat, Päron", price: "" },
            { name: "Kaffe/Te", price: "30:-" },
            { name: "Folköl (33cl)", price: "45:-" },
            { name: "Alkoholfri öl (33cl)", price: "45:-" },
            { name: "Alkoholfri vin", price: "45:-" },
            { name: "Alkoholfri cider (33cl)", price: "45:-" },
          ],
        },
        {
          title: "Flasköl / Bottled Beers",
          items: [
            { name: "Chang (62cl)", price: "99:-" },
            { name: "Chang (33cl)", price: "62:-" },
            { name: "Singha (63cl)", price: "95:-" },
            { name: "Singha (33cl)", price: "59:-" },
            { name: "Falcon (50cl)", price: "69:-" },
            { name: "Falcon (33cl)", price: "59:-" },
            { name: "Eriksberg (50cl)", price: "69:-" },
            { name: "Päroncider (33cl)", price: "59:-" },
            { name: "Mariestad (50cl)", price: "69:-" },
            { name: "Carlsberg Hof (33cl)", price: "55:-" },
          ],
        },
        {
          title: "Husets Vin: Rött/Vitt / Wine Red/White",
          items: [
            { name: "Glas", price: "65:-" },
            { name: "Flaska", price: "259:-" },
          ],
        },
        {
          title: "Drinkar / Drinks",
          items: [
            { name: "Irish Coffee 4cl", price: "115:-" },
            { name: "Irish Coffee 6cl", price: "145:-" },
            { name: "Gin & Tonic 4cl", price: "135:-" },
            { name: "Gin & Tonic 6cl", price: "165:-" },
            { name: "Rum & Cola 4cl", price: "135:-" },
            { name: "Rum & Cola 6cl", price: "165:-" },
          ],
        },
        {
          title: "Likör, Cognacs & Whiskeys",
          items: [
            { name: "Baileys", price: "23:- / cl" },
            { name: "Cointreau", price: "23:- / cl" },
            { name: "Skåne", price: "23:- / cl" },
            { name: "Jägermeister", price: "23:- / cl" },
            { name: "Gammel Dansk", price: "23:- / cl" },
            { name: "Grönstedts Grön", price: "25:- / cl" },
            { name: "Jameson", price: "25:- / cl" },
            { name: "Johnnie Walker, Red Lable", price: "25:- / cl" },
            { name: "Jack Daniels", price: "25:- / cl" },
          ],
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 text-white hover:text-amber-400 transition-colors p-1.5 md:p-2 bg-black/50 rounded-full"
          >
            <X className="h-5 w-5 md:h-8 md:w-8" />
          </button>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 md:top-4 z-50 text-white bg-black/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
            <span className="text-sm md:text-lg font-semibold">
              {currentImageIndex + 1} / {currentCategoryImages.length}
            </span>
          </div>

          <div className="absolute top-16 right-2 md:top-20 md:right-4 z-50 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                zoomIn()
              }}
              className="text-white hover:text-amber-400 transition-colors p-1.5 md:p-2 bg-black/50 rounded-full hover:bg-black/70"
              title="Zooma in (+)"
            >
              <ZoomIn className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                zoomOut()
              }}
              className="text-white hover:text-amber-400 transition-colors p-1.5 md:p-2 bg-black/50 rounded-full hover:bg-black/70"
              title="Zooma ut (-)"
            >
              <ZoomOut className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <div className="text-white text-xs md:text-sm bg-black/50 px-2 py-1 rounded-full text-center">
              {Math.round(zoomLevel * 100)}%
            </div>
          </div>

          {currentCategoryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 md:left-4 z-50 text-white hover:text-amber-400 transition-colors p-2 md:p-3 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6 md:h-10 md:w-10" />
            </button>
          )}

          {currentCategoryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 md:right-4 z-50 text-white hover:text-amber-400 transition-colors p-2 md:p-3 bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6 md:h-10 md:w-10" />
            </button>
          )}

          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-2 md:p-4 overflow-auto"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStartZoom}
            onTouchMove={handleTouchMoveZoom}
            onTouchEnd={handleTouchEndZoom}
          >
            <img
              src={currentCategoryImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Menu ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>

          {currentCategoryImages.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-xs md:text-sm bg-black/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full md:hidden">
              Svep för att bläddra • Nyp för att zooma
            </div>
          )}
        </div>
      )}

      {showCallPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="relative bg-gradient-to-br from-neutral-900 via-amber-950 to-neutral-900 p-8 md:p-12 rounded-2xl border-4 border-amber-500/60 shadow-2xl max-w-md w-full animate-in zoom-in duration-300"
            style={{
              boxShadow: "0 0 60px rgba(251, 191, 36, 0.3), 0 0 120px rgba(251, 191, 36, 0.1)",
            }}
          >
            <button
              onClick={() => setShowCallPopup(false)}
              className="absolute top-4 right-4 text-amber-200 hover:text-amber-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-amber-500/20 p-6 rounded-full border-2 border-amber-500/40 animate-pulse">
                  <Phone className="h-16 w-16 text-amber-400" />
                </div>
              </div>

              <h3
                className="text-3xl md:text-4xl font-bold text-amber-100 mb-4"
                style={{
                  fontFamily: "Georgia, serif",
                  textShadow: "0 0 20px rgba(251, 191, 36, 0.4), 0 0 80px rgba(251, 191, 36, 0.3)",
                }}
              >
                Ring Oss
              </h3>

              <p className="text-amber-200 text-lg mb-6">Vänligen ring oss från din telefon</p>

              <div className="bg-black/40 p-6 rounded-lg border-2 border-amber-600/40 mb-6">
                <p className="text-amber-100 text-sm mb-2">Telefonnummer:</p>
                <p
                  className="text-4xl font-bold text-amber-400"
                  style={{
                    textShadow: "0 0 15px rgba(251, 191, 36, 0.5)",
                  }}
                >
                  0533-16368
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-500"></div>
                <div className="w-3 h-3 bg-amber-500 rotate-45"></div>
                <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-500"></div>
              </div>

              <p className="text-amber-300/70 text-sm">Vi ser fram emot att höra från dig!</p>

              <Button
                onClick={() => setShowCallPopup(false)}
                className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3"
              >
                Stäng
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-neutral-900 text-white py-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1
                className="text-2xl font-bold cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Taste of Asia
              </h1>
              <div className="hidden md:flex gap-6">
                <a href="#home" className="hover:text-red-500 transition-colors">
                  Hem
                </a>
                <a href="#menu" className="hover:text-red-500 transition-colors">
                  Meny
                </a>
                <a href="#about" className="hover:text-red-500 transition-colors">
                  Om Oss
                </a>
                <a href="#contact" className="hover:text-red-500 transition-colors">
                  Kontakt
                </a>
              </div>
            </div>
            <button onClick={handleCallClick} className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">0533-16368</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Home Section */}
      <section
        id="home"
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover md:object-contain bg-black">
            <source
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tasteofasia-SX2jeXJj8XPeq92f2hzGdtrlpCRuPr.mp4"
              type="video/mp4"
            />
            Din webbläsare stöder inte video-taggen.
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-balance drop-shadow-2xl leading-tight">
            Välkommen till Taste of Asia
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-balance drop-shadow-lg px-2">
            Autentisk asiatisk mat i hjärtat av Säffle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 shadow-xl">
              <a href="#menu">Se Vår Meny</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20 text-lg px-8 shadow-xl"
              onClick={handleCallClick}
            >
              Ring & Beställ
            </Button>
          </div>
        </div>
      </section>

      {/* Emblem Section - Updated */}
      <div className="relative">
        <div className="absolute left-0 right-0 -top-8 lg:-top-10 z-20 flex items-center justify-center px-4">
          <div className="relative flex items-center justify-center gap-2 md:gap-4 w-full max-w-4xl">
            {/* Left ornamental line */}
            <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/60 to-amber-500"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rotate-45 shadow-lg shadow-amber-400/50"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50"></div>
            </div>

            {/* Center ornament */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-amber-500/60 rotate-45 flex items-center justify-center shadow-2xl shadow-amber-500/30 bg-black/80">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-amber-400 to-red-600 rotate-45 shadow-xl shadow-amber-500/50"></div>
              </div>
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/70 animate-pulse"></div>
              <div
                className="absolute -top-1.5 -right-1.5 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/70 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/70 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 md:w-4 md:h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/70 animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>

            {/* Right ornamental line */}
            <div className="flex-1 flex items-center justify-start gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rotate-45 shadow-lg shadow-amber-500/50"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rotate-45 shadow-lg shadow-amber-400/50"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-500/60 to-amber-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <section
        id="menu"
        className="py-12 md:py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(139, 69, 19, 0.85), rgba(40, 40, 40, 0.95)), url('/images/tropical-bamboo-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 opacity-20">
          <img src="/images/tropical-palm.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20 transform scale-x-[-1]">
          <img src="/images/tropical-palm.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 w-80 h-80 opacity-15">
          <img src="/images/tropical-palm.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-15 transform scale-x-[-1]">
          <img src="/images/tropical-palm.jpg" alt="" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-40 right-20 w-32 h-32 opacity-25 animate-pulse">
          <img src="/images/lotus-flower.jpg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-40 left-20 w-32 h-32 opacity-25 animate-pulse" style={{ animationDelay: "1s" }}>
          <img src="/images/lotus-flower.jpg" alt="" className="w-full h-full object-contain" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-amber-100 drop-shadow-2xl"
              style={{
                fontFamily: "Georgia, serif",
                textShadow: "0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)",
              }}
            >
              Vår Meny
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-4 md:mb-6">
              <div className="w-16 md:w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-red-600 rounded-full shadow-lg shadow-amber-500/50"></div>
              <div className="flex gap-2 md:gap-3">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rotate-45 shadow-xl shadow-amber-500/70 animate-pulse"></div>
                <div
                  className="w-3 h-3 md:w-4 md:h-4 bg-red-600 rotate-45 shadow-xl shadow-red-600/70 animate-pulse"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="w-3 h-3 md:w-4 md:h-4 bg-amber-500 rotate-45 shadow-xl shadow-amber-500/70 animate-pulse"
                  style={{ animationDelay: "0.6s" }}
                ></div>
              </div>
              <div className="w-16 md:w-32 h-1 bg-gradient-to-l from-transparent via-red-600 to-amber-500 rounded-full shadow-lg shadow-red-600/50"></div>
            </div>
            <p className="text-amber-200 text-lg md:text-2xl italic font-serif drop-shadow-lg">
              Alla rätter innehåller grönsaker
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-bold text-amber-100 mb-3">
                {menuCategories[selectedCategory as keyof typeof menuCategories].title}
              </h3>
              <p className="text-amber-200 text-base md:text-xl italic">
                {menuCategories[selectedCategory as keyof typeof menuCategories].description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
              {Object.entries(menuCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-lg transition-all duration-300 ${
                    selectedCategory === key
                      ? "bg-amber-500 text-black shadow-2xl shadow-amber-500/50 scale-105"
                      : "bg-neutral-900/70 text-amber-200 hover:bg-neutral-800/70 border-2 border-amber-600/40"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-4xl font-bold text-amber-100 mb-3">
                  {menuCategories[selectedCategory as keyof typeof menuCategories].title}
                </h3>
                <p className="text-amber-200 text-base md:text-xl italic">
                  {menuCategories[selectedCategory as keyof typeof menuCategories].description}
                </p>
              </div>

              {menuCategories[selectedCategory as keyof typeof menuCategories].type === "images" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {menuCategories[selectedCategory as keyof typeof menuCategories].images?.map((image, index) => {
                    const categoryImages = menuCategories[selectedCategory as keyof typeof menuCategories].images!.map(
                      (img) => (typeof img === "string" ? img : img.src),
                    )

                    return (
                      <div
                        key={index}
                        onClick={() => openLightbox(categoryImages, index)}
                        className="bg-neutral-900/70 backdrop-blur-sm p-4 rounded-xl border-2 border-amber-600/40 shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                      >
                        <img
                          src={typeof image === "string" ? image : image.src}
                          alt={typeof image === "string" ? `Menu ${index + 1}` : image.alt}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-8">
                  {menuCategories[selectedCategory as keyof typeof menuCategories].sections?.map(
                    (section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="bg-neutral-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border-2 border-amber-600/40 shadow-2xl"
                      >
                        <h4 className="text-xl md:text-3xl font-bold text-amber-100 mb-4 border-b-2 border-amber-600/40 pb-3">
                          {section.title}
                        </h4>
                        {section.description && (
                          <p className="text-amber-200 text-sm md:text-base italic mb-4">{section.description}</p>
                        )}
                        <div className="space-y-4">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex justify-between items-start gap-4 text-amber-100">
                              <div className="flex-1">
                                <p className="font-medium text-sm md:text-base leading-relaxed">
                                  {item.name}
                                  {item.description && (
                                    <span className="block text-amber-200/80 text-xs md:text-sm mt-1 italic">
                                      {item.description}
                                    </span>
                                  )}
                                </p>
                              </div>
                              {item.price && (
                                <span className="font-bold text-amber-400 text-sm md:text-base whitespace-nowrap">
                                  {item.price}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>

            <div className="text-center mt-12 md:mt-16">
              <p className="text-lg md:text-2xl text-amber-100 mb-6 md:mb-8 font-medium drop-shadow-lg px-4">
                Vi erbjuder avhämtning och servering i restaurangen
              </p>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl px-8 md:px-12 py-6 md:py-7 shadow-2xl hover:shadow-red-600/50 transition-all hover:scale-105"
                onClick={handleCallClick}
              >
                <Phone className="mr-2 md:mr-3 h-6 w-6 md:h-7 md:w-7" />
                Beställ Nu: 0533-16368
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Gallery Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-neutral-50 to-neutral-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">Vår Restaurang</h2>
            <p className="text-lg md:text-xl text-neutral-600">En inbjudande atmosfär för alla tillfällen</p>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <div
                className="overflow-hidden rounded-xl shadow-lg"
                onTouchStart={handleGalleryTouchStart}
                onTouchMove={handleGalleryTouchMove}
                onTouchEnd={handleGalleryTouchEnd}
              >
                <img
                  src={restaurantImages[galleryIndex].src || "/placeholder.svg"}
                  alt={restaurantImages[galleryIndex].alt}
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-4">
                {restaurantImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === galleryIndex ? "bg-red-600 w-8" : "bg-neutral-300"
                    }`}
                    aria-label={`Gå till bild ${index + 1}`}
                  />
                ))}
              </div>

              {/* Swipe hint */}
              <p className="text-center text-neutral-500 text-sm mt-3">Svep för att se fler bilder</p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:block space-y-6">
              {/* Top row - 2 images */}
              <div className="grid grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={restaurantImages[0].src || "/placeholder.svg"}
                    alt={restaurantImages[0].alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={restaurantImages[1].src || "/placeholder.svg"}
                    alt={restaurantImages[1].alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Middle row - 1 large centered image */}
              <div className="flex justify-center">
                <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-2/3 lg:w-1/2">
                  <img
                    src={restaurantImages[2].src || "/placeholder.svg"}
                    alt={restaurantImages[2].alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Bottom row - 2 images */}
              <div className="grid grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={restaurantImages[3].src || "/placeholder.svg"}
                    alt={restaurantImages[3].alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={restaurantImages[4].src || "/placeholder.svg"}
                    alt={restaurantImages[4].alt}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-neutral-900">Om Taste of Asia</h2>
            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              Välkommen till Taste of Asia, där vi serverar autentisk asiatisk mat med passion och omsorg. Våra rätter
              tillagas med färska ingredienser och traditionella recept som tar dig på en smakresa genom Asien. Vi
              erbjuder ett brett utbud av rätter från olika asiatiska kök, inklusive kyckling, oxkött, räkor och
              vegetariska alternativ.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-red-600 mb-4 flex justify-center">
                  <Clock className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-neutral-900">Öppettider</h3>
                <p className="text-neutral-600">
                  Mån-Fre: 11:00 - 21:00
                  <br />
                  Lör-Sön: 12:00 - 21:00
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-red-600 mb-4 flex justify-center">
                  <Phone className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-neutral-900">Telefon</h3>
                <p className="text-neutral-600">
                  <button onClick={handleCallClick} className="hover:text-red-600 transition-colors">
                    0533-16368
                  </button>
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-red-600 mb-4 flex justify-center">
                  <Mail className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-xl mb-2 text-neutral-900">E-post</h3>
                <p className="text-neutral-600">
                  <a href="mailto:tasteofasia2024@gmail.com" className="hover:text-red-600 transition-colors break-all">
                    tasteofasia2024@gmail.com
                  </a>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Hitta Till Oss</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6">Kontaktinformation</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Adress</h4>
                    <p className="text-neutral-300">
                      Östra Storgatan 7-9
                      <br />
                      Säffle, Sweden
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telefon</h4>
                    <button onClick={handleCallClick} className="text-neutral-300 hover:text-red-500 transition-colors">
                      0533-16368
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">E-post</h4>
                    <a
                      href="mailto:tasteofasia2024@gmail.com"
                      className="text-neutral-300 hover:text-red-500 transition-colors break-all"
                    >
                      tasteofasia2024@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Öppettider</h4>
                    <p className="text-neutral-300">
                      Måndag - Fredag: 11:00 - 21:00
                      <br />
                      Lördag - Söndag: 12:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2051.8!2d12.9333!3d59.1333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464585a0c0000001%3A0x0!2zw5ZzdHJhIFN0b3JnYXRhbiA3LTksIFPDpGZmbGU!5e0!3m2!1sen!2sse!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-neutral-400">© 2025 Taste of Asia. Alla rättigheter förbehållna.</p>
          <p className="text-neutral-500 mt-2">
            Östra Storgatan 7-9, Säffle, Sweden | Tel:{" "}
            <button onClick={handleCallClick} className="hover:text-red-500 transition-colors underline">
              0533-16368
            </button>
          </p>
        </div>
      </footer>
    </div>
  )
}
