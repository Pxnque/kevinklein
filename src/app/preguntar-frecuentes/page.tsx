"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

interface FAQItem {
    question: string;
    answer: JSX.Element;
  }

const page = () => {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  const toggleContent = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  const faqData: FAQItem[] = [
    {
      question: "¿QUÉ ES KEVIN KLEIN?",
      answer: (
        <>
          <p>
            KEVIN KLEIN, Inc. es uno de los principales estudios de marketing y diseño de moda del mundo. Diseña y comercializa colecciones de ropa de diseñador para mujer y hombre, y una gama de otros productos que se fabrican y comercializan a través de una extensa red de acuerdos de licencias y otras disposiciones en todo el mundo.
          </p>
          <br />
          <p>
            Las marcas/estilos de vida incluyen KEVIN KLEIN Collection, KEVIN KLEIN Platinum Label, KEVIN KLEIN Jeans y KEVIN KLEIN Underwear. Las líneas de producto bajo las marcas de KEVIN KLEIN abarcan vestidos y trajes de mujer, accesorios de vestir y ropa confeccionada a medida para hombre, ropa deportiva para hombre y mujer, ropa de colección y de pasarela, ropa interior, perfumes, gafas, medias y calcetines, calzado, ropa de baño, joyas, relojes, ropa de abrigo, bolsos de mano y accesorios de piel.
          </p>
          <br />
          <span>En cualquier momento puedes contactarnos a través de nuestro formulario de contacto </span>
          <br />
          <span>
            <a href="/contacto" className="font-primary">
              https://www.calvinklein.mx/contacto
            </a>
          </span>
          <br />
        </>
      ),
    },
    {
      question: "¿Cómo me puedo poner en contacto?",
      answer: (
        <>
          <p>En nuestro Centro de Atención a Clientes nos esforzamos por aclarar todas tus dudas. Además, puedes estar seguro de que te asistiremos en el proceso de compra, rastreo o devolución de tu pedido.</p>
          <p>Nuestro equipo también está preparado para informarte sobre todos los productos de nuestra tienda.</p>
          <p>¡Estamos comprometidos en proporcionarte la mejor experiencia de compra! Nuestro horario de atención es:</p>
          <span>*lunes a viernes de 9:00am a 9:00pm</span><br />
          <span>Hora de la Ciudad de México.</span>
          <p> Llámanos o mándanos un correo, ¡y con gusto te atenderemos! Nuestro teléfono de atención a clientes es:</p>
          <p>
              Nuestro teléfono de atención a clientes es:<br />
              (55) 4161-4842
          </p>
          <span> Y nuestro e-mail: <a href="mailto:servicioalcliente_ck@grupoaxo.com" className="font-primary">servicioalcliente_ck@grupoaxo.com </a>.</span><br />
          <span>En cualquier momento puedes contactarnos a través de nuestro formulario de contacto </span><br />
          <span> <a href="/contacto" className="font-primary">https://www.calvinklein.mx/contacto</a></span><br />
        </>
      ),
    },
    {
      question: "¿Cómo compro?",
      answer: (
        <>
          <p> Para iniciar tu experiencia con Calvin Klein, regístrate dando clic aquí (<a href="/registro" className="hover:underline hover:cursor-pointer">https://www.calvinklein.mx/registro</a>). Una vez te hayas registrado, selecciona los artículos que más te gusten, ingresa el método de pago y confirma tu compra. </p>
        </>
      ),
    },
    {
      question: "¿Cómo elimino un producto de mi carrito?",
      answer: (
        <>
         <p>Solo da clic en la “ X “para que el producto se elimine de tu carrito.</p>
        </>
      ),
    },
    {
      question: "¿Cuáles métodos de pago son aceptados?",
      answer: (
        <>
         <p>Puedes usar cualquier tarjeta Visa, MasterCard, o American Express emitida por cualquier banco dentro de México, también puedes pagar mediante cuenta PayPal o con pago efectivo directamente en Oxxo. Estas opciones estarán disponibles cuando inicies el proceso de pago en nuestro sitio.</p>
        </>
      ),
    },
    {
      question: "¿Cómo hago mi compra utilizando PayPal?",
      answer: (
        <>
          <p>Al elegir esta forma de pago, el sitio te dirigirá automáticamente a PayPal para que puedas acceder a tu cuenta y así realizar tu pago.</p>
        </>
      ),
    },
    {
      question: "¿Puedo pagar a Meses Sin Intereses?",
      answer: (
        <>
          <p>Si, los montos aplicables son:</p>
          <span>3 y 6 MSI con compra mínima de $3,000 a través de PayPal </span><br/>
          <span>3 MSI y 6 MSI con compra mínima de $5,000 con tarjeta de crédito</span>
        </>
      ),
    },
    {
      question: "¿Puedo usar los monederos expedidos en tienda?",
      answer: (
        <>
          <p>Por el momento este método de pago no está habilitado, pero próximamente te daremos noticias al respecto.</p>
        </>
      ),
    },
    {
      question: "¿Puedo comprar estando fuera de México?",
      answer: (
        <>
          <p>Si, siempre y cuando utilices tarjetas de crédito o débito emitidas en México y la entrega del pedido se haga en una dirección válida dentro del territorio mexicano.</p>
        </>
      ),
    },
    {
      question: "¿Dónde está mi pedido?",
      answer: (
        <>
          <p> Una vez que tu pedido salga a reparto, recibirás a tu correo electrónico el número de guía con el que podrás dar seguimiento a tu pedido. Nuestras fechas estimadas de entrega son de hasta 6-9 días hábiles. En caso de exceder estas fechas, contáctanos a través de nuestro canal de atención a clientes. </p>
        </>
      ),
    },
    {
      question: "¿Cuánto tiempo tardará en llegar mi pedido?",
      answer: (
        <>
          <p>El tiempo de entrega es de hasta 6-9 días hábiles después de haber recibido el correo de confirmación de tu compra. Nuestros tiempos de entrega pueden llegar a extenderse más de lo habitual. </p>
        </>
      ),
    },
    {
      question: "¿Como obtengo mi número de guía?",
      answer: (
        <>
           <p>Una vez que tu pedido salga a reparto, recibirás al correo electrónico que usaste para tu compra tu número de guía, si no has recibido tu guía es porque tu pedido aún se encuentra en preparación en nuestro almacén. Es importante considerar que tu entrega será en un tiempo máximo de 5 días hábiles.</p>
        </>
      ),
    },
    {
      question: "¿Como puedo devolver o cambiar mi pedido?",
      answer: (
        <>
           <p> Antes de solicitar tu devolución o cambio, te recomendamos leer las políticas de devoluciones, ya que ahí encontraras toda la información que necesitas, las puedes revisar desde el enlace (<a href="/devoluciones" className="hover:underline hover:cursor-pointer">https://www.calvinklein.mx/devoluciones</a>&gt;)</p>
        </>
      ),
    },
    {
      question: "¿Puedo cancelar mi pedido?",
      answer: (
        <>
           <p>Tu pedido puede ser cancelado en un corto lapso antes de que tu compra sea procesada por el almacén, para revisar tu cancelación, comunícate con el centro de atención a clientes para saber si aún es posible cancelar tu pedido, en caso de que no sea posible, puedes hacer la devolución de tus artículos, para obtener tu reembolso. </p>
        </>
      ),
    },
    {
      question: "¿Por qué no puedo ver mi reembolso?",
      answer: (
        <>
           <p>Tu reembolso tarda aproximadamente de 5 a 20 días hábiles, una vez confirmada la liberación de tu reembolso, éste se verá reflejado en tu estado de cuenta bancario o PayPal. Para todas las devoluciones, el costo de envío no será reembolsable.</p>
        </>
      ),
    },
    {
      question: "¿Qué hago si recibí mi pedido incompleto?",
      answer: (
        <>
            <p>Si tu pedido ha llegado incompleto, es importante nos compartas a nuestro centro de atención a clientes dentro de los primeros 2 días naturales posteriores a la entrega, fotografías de los 6 lados de tu caja y una foto del recibo que viene dentro del paquete. Es importante nos notifiques el producto que no llegó. Se creará un caso de seguimiento el cuál puede tardar hasta 20 días hábiles en ser resuelto. </p>
        </>
      ),
    },
    {
      question: "¿Qué hago si mi producto llegó dañado?",
      answer: (
        <>
           <p>Si el producto llego dañado, es importante nos compartas a nuestro centro de atención a clientes dentro de los primeros 3 días naturales posteriores a la entrega, fotografías del empaque y el producto tal cual lo recibiste, una vez recibamos tu mensaje se evaluará el caso y confirmará el proceso de retorno a nuestro almacén para posteriormente proceder con tu reembolso. </p>
        </>
      ),
    },
  ];
  return (
    <>
    <div className='bg-white text-black'>
        <div className='bg-black '>
        <Navbar/>
        </div>
        
        <div className='h-96 bg-cover bg-center flex items-center justify-center relative z-0'>
        <div className="absolute inset-0 z-0 bg-custom-faq bg-cover"></div>
        <div className='flex flex-col'>
        <h1 className="text-white lg:text-6xl sm:text-3xl font-thin font-montserrat z-10 tracking-[19px] pl-6 py-2">PREGUNTAS</h1>
        <h1 className="text-white lg:text-6xl sm:text-3xl font-thin font-montserrat z-10 tracking-[19px] py-2">FRECUENTES</h1>
        </div>
        
      </div>
      <div className="max-w-[700px] lg:max-w-[1007px] m-auto px-6">
      <div className="my-10">
      <ul className="list-disc">
            {faqData.map((faq, index) => (
              <li
                key={index}
                className="py-4 px-2 border-b-2 border-gray-200 transition-colors duration-100 "
              >
                <a
                  className={`cursor-pointer uppercase font-normal size-5 hover:underline tracking-[5px] font-montserrat ${
                    expandedIndices.includes(index) ? 'text-[#173C86]' : 'text-black'
                  }`}
                  onClick={() => toggleContent(index)}
                >
                  {faq.question}
                </a>
                <div
                  className={`text-xs transition-all duration-500 ease-in-out overflow-hidden ${
                    expandedIndices.includes(index) ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
        <Footer/>
    </div>
    </>
  )
}

export default page
