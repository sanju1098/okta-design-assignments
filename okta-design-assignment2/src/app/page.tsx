import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MousePointer, Palette, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-gradient-to-br from-[#ffffff] via-[#f3f6f9] to-[#ffffff]">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-[#2970ff]/10 text-[#2970ff] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                <span>Visual Form Builder</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#2970ff] to-[#5c8dff] bg-clip-text text-transparent">
                  FormKit
                </span>
              </h1>

              <p className="text-xl text-[#6b778c] mb-8 max-w-2xl mx-auto leading-relaxed">
                Create beautiful, functional forms with our intuitive
                drag-and-drop builder. No coding required – just drag, drop, and
                deploy.
              </p>

              <div className="flex items-center justify-center space-x-4">
                <Link href="/builder">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#2970ff] to-[#5c8dff] hover:shadow-lg hover:shadow-[#2970ff]/25 transition-all duration-300 group text-white"
                  >
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-[#e3e8ef]/50 hover:border-[#2970ff]/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#2970ff]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2970ff]/20 transition-colors">
                    <MousePointer className="h-6 w-6 text-[#2970ff]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Drag & Drop</h3>
                  <p className="text-[#6b778c] text-sm">
                    Effortlessly build forms by dragging components from our
                    rich library
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#e3e8ef]/50 hover:border-[#2970ff]/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#2970ff]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2970ff]/20 transition-colors">
                    <Palette className="h-6 w-6 text-[#2970ff]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Beautiful Design
                  </h3>
                  <p className="text-[#6b778c] text-sm">
                    Professional-looking forms with modern design and smooth
                    animations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#e3e8ef]/50 hover:border-[#2970ff]/50 transition-all duration-300 hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#2970ff]/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2970ff]/20 transition-colors">
                    <Zap className="h-6 w-6 text-[#2970ff]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Real-time Preview
                  </h3>
                  <p className="text-[#6b778c] text-sm">
                    See your form come to life as you build it with instant
                    preview mode
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
