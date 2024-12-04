"use client";
//import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import Link from "next/link";
//import { AspectRatio } from "@/components/ui/aspect-ratio";
//import { div, divContent } from "../components/div/div";
//import { Button } from "@/components/ui/button";
//import Imagen1 from "@/app/public/img/elegantioso.jpg";
//bg-[url('https://images.unsplash.com/photo-1724812774041-0460ce39a623?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"

const nosotrosPage = () => {
  return (
    <div className="bg-slate-50 text-black">
      <div className="bg-black ">
        <Navbar />
      </div>

      <section
        className="mb-15  px-4 py-10  text-white text-justify  from-cyan-500 to-blue-500 bg-fixed bg-center bg-no-repeat bg-cover
       bg-[url('https://images.unsplash.com/photo-1721549369164-2fd07f795ce4?q=80&w=1017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
        "
      >
        <div className="bg-black bg-opacity-75 px-16 rounded-lg p-8">
          <h2 className=" text-center text-4xl font-semibold mb-8">
            Nuestra Historia
          </h2>
          <div className=" items-center gap-8">
            <div className="">
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
            {/*}<div className="">
              <Image
                src={Imagen1}
                alt="GentStyle's growth over the years"
                width={400}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>{*/}
          </div>
        </div>
      </section>

      <section className=" mb-12 mt-12">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-4 text-center">
            Nuestra Mision
          </h2>
          <div>
            <div className="p-6">
              <p className="text-lg italic text-center">
                &quot;Empoderar a los hombres para expresar su estilo personal
                con confianza, a través de ropa de calidad, orientación experta
                y una experiencia de compra sin complicaciones.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-4 text-center">
            Qué nos hace diferentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="p-6 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                className="bg-gradient-to-t from-blue-900 from-35% to-transparent
                 hover:from-blue-900 hover:to-black"
                key={member.name}
              >
                <div className="p-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold mb-2 text-center text-white">
                    {member.name}
                  </h3>
                  <p className="text-center text-muted-foreground text-gray-100">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center">
        <div className=" px-16">
          <h2 className="text-4xl font-semibold mb-4">
            ¿Listo para mejorar tu estilo?
          </h2>
          <p className="text-xl mb-6">
            Explora nuestras últimas colecciones y encuentra tu look perfecto.
          </p>
          <span  typeof="button"  className="mb-12 font-semibold text-lg">
            <Link href="#">Compra Ahora</Link>
          </span>
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
    image: "/elegantioso.png",
  },
  {
    name: "Michael Ross",
    role: "Estilista Principal",
    image: "/img/elegantioso.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Gerente de Experiencia del Cliente",
    image: "/img/elegantioso.jpg",
  },
  {
    name: "Tom Baker",
    role: "Director de Cadena de Suministro",
    image: "/img/elegantioso.jpg",
  },
];

export default nosotrosPage;
