import Image from "next/image";

export function HeroSection() {
	return (
		<section id="hero" className="relative w-full h-screen font-lato font-light text-lg">
			<Image
				fill
				priority
				sizes="100vw"
				alt="Imagen de fondo de pantalla"
				src="/images/background_image.png"
				className="object-cover lg:object-fill"
			/>
			<div className="absolute inset-0 bg-accent-foreground/80" />

		</section>
	);
}