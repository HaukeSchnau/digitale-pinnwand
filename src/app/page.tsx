import { Button } from "@/components/ui/button";
import { PlusCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-rose-700">
            Unsere Hochzeitserinnerungen
          </h1>
          <Link href="/upload">
            <Button className="bg-rose-600 hover:bg-rose-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Foto hinzufügen
            </Button>
          </Link>
        </div>
      </header>

      {/* Welcome Message */}
      <section className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-serif mb-4 text-gray-800">
            Willkommen in unserem digitalen Fotoalbum!
          </h2>
          <p className="text-gray-600 mb-4">
            Hilf uns, jeden besonderen Moment unseres Hochzeitstages
            festzuhalten. Mache Fotos während der Feier und teile sie hier,
            damit alle sie genießen können.
          </p>
          <div className="flex justify-center">
            <Link href="/upload">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Deine Fotos hochladen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* This would be mapped from actual photos in a real implementation */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="relative group">
              <div className="aspect-square overflow-hidden bg-white rounded-lg shadow-md">
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=Hochzeitsfoto ${
                    i + 1
                  }`}
                  alt={`Hochzeitsfoto ${i + 1}`}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button
                className="absolute bottom-3 right-3 bg-white/80 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Foto liken"
              >
                <Heart className="h-5 w-5 text-rose-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty state - would be shown conditionally if no photos */}
        {false && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              Es wurden noch keine Fotos hochgeladen.
            </p>
            <p className="text-gray-500 mb-6">
              Sei der Erste, der einen besonderen Moment teilt!
            </p>
            <Link href="/upload">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Ein Foto hochladen
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Vielen Dank, dass du mit uns feierst und deine Erinnerungen teilst!
          </p>
        </div>
      </footer>
    </div>
  );
}
