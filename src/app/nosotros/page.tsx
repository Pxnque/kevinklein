"use client";
//import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import Link from "next/link";
import P1 from "@/app/public/img/p1.png";
import P2 from "@/app/public/img/p2.png";
import P3 from "@/app/public/img/p3.png";
import P4 from "@/app/public/img/p4.png";

const nosotrosPage = () => {
  return (
    <div className="bg-slate-50 text-black">
      <div className="bg-black ">
        <Navbar />
      </div>

      <section
        className="mb-15  px-4 py-10  text-white text-justify bg-fixed bg-center bg-no-repeat bg-cover
       bg-[url('https://images.unsplash.com/photo-1721549369164-2fd07f795ce4?q=80&w=1017&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]
        "
      >
        <div className="bg-black bg-opacity-75 px-16 rounded-lg p-8">
          <h2 className=" text-center text-4xl font-bold mb-8">
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
          </div>
        </div>
      </section>

      <section className=" mb-12 mt-12">
        <div className=" px-16">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Nuestra Misión
          </h2>
          <div>
            <div className=" bg-white drop-shadow-md border-2 rounded-2xl border-gray-300 p-6">
              <p className="text-lg italic text-center b">
                &quot;Empoderar a los hombres para expresar su estilo personal
                con confianza, a través de ropa de calidad, orientación experta
                y una experiencia de compra sin complicaciones.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 py-12 bg-gradient-to-b from-blue-800 to-blue-950 ">
        <div className=" px-16">
          <h2 className="  text-white mb-8 text-4xl font-bold text-center">
            ¿Qué nos hace diferentes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="  bg-white drop-shadow-sm border-2 rounded-xl border-gray-200 p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="p-4 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className=" px-16">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {" "}
            {/*-> Aqui  esta el que tiene todos las tarjetas*/}
            <div className="rounded-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 duration-300">
              <div className="p-6 place-items-center">
                <Image
                  src={P1}
                  alt="Michael Ross"
                  width={200}
                  height={200}
                  className="rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-center text-white">
                  Michael Ross
                </h3>
                <p className="text-center text-muted-foreground text-gray-100">
                  Fundador y Jefe de Diseño
                </p>
              </div>
            </div>
            <div className="rounded-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 duration-300">
              <div className="p-6 place-items-center">
                <Image
                  src={P2}
                  alt="Lidia Chen"
                  width={200}
                  height={200}
                  className="rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-center text-white">
                  Lidia Chen
                </h3>
                <p className="text-center text-muted-foreground text-gray-100">
                  Estilista Principal
                </p>
              </div>
            </div>
            <div className=" rounded-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 duration-300">
              <div className=" place-items-center p-6">
                <Image
                  src={P3}
                  alt="Sarah Johnson"
                  width={200}
                  height={200}
                  className="rounded-full mb-4  "
                />
                <h3 className=" text-2xl font-semibold mb-2 text-center text-white">
                  Sarah Johnson
                </h3>
                <p className="text-center text-muted-foreground text-gray-100">
                  Gerente de Experiencia del Cliente
                </p>
              </div>
            </div>
            <div className="rounded-xl transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 duration-300">
              <div className=" place-items-center p-6">
                <Image
                  src={P4}
                  alt="Tom Baker"
                  width={200}
                  height={200}
                  className="rounded-full mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2 text-center text-white">
                  Tom Baker
                </h3>
                <p className="text-center text-muted-foreground text-gray-100">
                  Director de Cadena de Suministro
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center my-12">
        <div className=" px-16">
          <h2 className="text-4xl font-bold my-4">
            ¿Listo para mejorar tu estilo?
          </h2>
          <p className="text-xl mb-6">
            Explora nuestras últimas colecciones y encuentra tu look perfecto.
          </p>
          <button className="text-white rounded-lg  px-6 py-3 font-semibold text-lgtransition ease-in-out delay-150 bg-zinc-900 hover:-translate-y-1 hover:scale-110 hover:bg-blue-800 duration-150 ...">
            <Link href="/Homepage">Compra Ahora</Link>
          </button>
          <span typeof="button" className="mb-12 font-semibold text-lg"></span>
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

export default nosotrosPage;
