"use client";
//import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import Link from "next/link";
//import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const nosotrosPage = () => {
  return (
    <div className="bg-slate-50 text-black">
      <div className="bg-black ">
        <Navbar />
      </div>

      <section className="mb-15  px-4 py-10 bg-gradient-to-r from-black from-27% via-blue-900 via-55% text-white text-justify">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-4">Nuestra Historia</h2>
          <div className="md:flex items-center gap-8">
            <div className="md:w-1/2">
              <p className="text-lg mb-4">
                Fundada en 2015, Kevin Klein comenzó con una misión simple:
                proporcionar a los hombres ropa de alta calidad y con estilo sin
                gastar demasiado. Comenzamos como una pequeña boutique en línea
                y, desde entonces, hemos crecido hasta convertirnos en un nombre
                confiable en la moda masculina, conocido por nuestras
                colecciones cuidadosamente seleccionadas y nuestro excepcional
                servicio al cliente.
              </p>
              <p className="text-lg mb-4">
                Nuestra trayectoria en la moda masculina está impulsada por
                nuestra pasión por ayudar a cada hombre a lucir y sentirse lo
                mejor posible, sin importar la ocasión o el presupuesto.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/img/elegantioso.jpg"
                alt="GentStyle's growth over the years"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" mb-12 mt-12">
        <div className=" px-16">
          <h2 className="text-3xl font-semibold mb-4">Nuestra Mision</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-lg italic text-center">
                &quot;Empoderar a los hombres para expresar su estilo personal
                con confianza, a través de ropa de calidad, orientación experta
                y una experiencia de compra sin complicaciones.&quot;
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-4">
            Qué nos hace diferentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card className="bg-blue-800"  key={member.name}>
                <CardContent className="p-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-center text-white">
                    {member.name}
                  </h3>
                  <p className="text-center text-muted-foreground text-blue-200">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <div className=" px-16">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Upgrade Your Style?
          </h2>
          <p className="text-lg mb-6">
            Explore our latest collections and find your perfect look.
          </p>
          <Button className="mb-12 font-semibold">
            <Link href="#">Compra Ahora</Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto">
        <Chatbot />
      </div>
      <Footer />
    </div>
  );
};

const features = [
  {
    title: "Calidad Artesanal",
    description:
      "Trabajamos con artesanos calificados y fabricantes de renombre para garantizar que cada pieza cumpla con nuestros altos estándares.",
  },
  {
    title: "Estilo para cada hombre",
    description:
      "Desde lo clásico hasta lo contemporáneo, nuestra diversa gama se adapta a diversos gustos y ocasiones.",
  },
  {
    title: "Servicio Personalizado",
    description:
      "Nuestros expertos en estilo siempre están listos para ayudarte a encontrar el atuendo perfecto o responder cualquier pregunta.",
  },
];

const teamMembers = [
  {
    name: "David Chen",
    role: "Fundador y Jefe de Diseño",
    image: "/img/elegantioso.jpg?height=200&width=200",
  },
  {
    name: "Michael Ross",
    role: "Estilista Principal",
    image: "/img/elegantioso.jpg?height=200&width=200",
  },
  {
    name: "Sarah Johnson",
    role: "Gerente de Experiencia del Cliente",
    image: "/img/elegantioso.jpg?height=200&width=200",
  },
  {
    name: "Tom Baker",
    role: "Director de Cadena de Suministro",
    image: "/img/elegantioso.jpg?height=200&width=200",
  },
];

export default nosotrosPage;
