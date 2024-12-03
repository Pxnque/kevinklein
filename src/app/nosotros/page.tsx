"use client";
//import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const nosotrosPage = () => {
  return (
    <>
      <div className="bg-white text-black">
        <div className="bg-black ">
          <Navbar />
        </div>
        <Card className="max-w ml-14 mr-14 p-3">
          <h1>Sobre Nosotros</h1>
          <p>
            Founded in 2015, GentStyle began with a simple mission: to provide
            men with high-quality, stylish clothing that doesnt break the bank.
            We started as a small online boutique and have since grown into a
            trusted name in mens fashion, known for our curated collections and
            exceptional customer service.
          </p>
          <div className="w-[450px]">
            <AspectRatio>
              <img
                className="Image"
                src="https://images.unsplash.https://images.unsplash.com/photo-1724812774041-0460ce39a623?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                alt="Landscape photograph by Tobias Tullius"
              />
            </AspectRatio>
          </div>
        </Card>

        <div className="h-96 bg-cover bg-center flex items-center justify-center relative z-0">
          <div className="absolute inset-0 z-0 bg-custom-faq bg-cover"></div>
          <div className="flex flex-col">
            <h1 className="text-white lg:text-6xl sm:text-3xl font-thin font-montserrat z-10 tracking-[19px] pl-6 py-2">
              PREGUNTAS
            </h1>
            <h1 className="text-white lg:text-6xl sm:text-3xl font-thin font-montserrat z-10 tracking-[19px] py-2">
              FRECUENTES
            </h1>
          </div>
        </div>
        <div className="container mx-auto">
          <Chatbot />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default nosotrosPage;
