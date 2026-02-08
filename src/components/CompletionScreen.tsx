"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ------------------ MESSAGES ------------------ */
const MESSAGES = [
	"{{name}}, you're the reason my heart beats faster 💓",
	"Every love story is beautiful, but ours is my favorite 💝",
	"In a sea of people, my eyes will always search for you 🌹",
	"You had me at hello... and every moment since ✨",
	"{{name}}, my heart is, and always will be, yours 💘",
];

/* ------------------ DECODE HELPER ------------------ */
const decodeName = (encoded?: string) => {
	try {
		if (!encoded) return "My Love";

		const decoded = decodeURIComponent(
			escape(atob(encoded))
		);

		return decoded
			.replace(/[^a-zA-Z ]/g, "")
			.slice(0, 20);
	} catch {
		return "My Love";
	}
};

const CompletionScreen = () => {
	const [messageIndex, setMessageIndex] = useState(0);
	const [name, setName] = useState("My Love");

	/* -------- Read encoded name from URL -------- */
	useEffect(() => {
		// Example URLs:
		// /play/Uml5YQ==
		// /?code=Uml5YQ==

		const pathParts = window.location.pathname.split("/");
		const possibleCode = pathParts[pathParts.length - 1];

		const queryCode = new URLSearchParams(
			window.location.search
		).get("code");

		const encoded = queryCode || possibleCode;
		setName(decodeName(encoded || undefined));
	}, []);

	const nextMessage = () => {
		setMessageIndex((i) => (i + 1) % MESSAGES.length);
	};

	const currentMessage = MESSAGES[messageIndex].replace(
		"{{name}}",
		name
	);

	return (
		<motion.div
			className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 sm:px-6"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<motion.div
				className="text-6xl sm:text-8xl mb-6 sm:mb-8"
				initial={{ scale: 0, rotate: -180 }}
				animate={{ scale: 1, rotate: 0 }}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 15,
					delay: 0.3
				}}
			>
				💌
			</motion.div>

			<motion.h2
				className="font-romantic text-3xl sm:text-4xl md:text-6xl text-glow text-primary-foreground mb-2 text-center"
				initial={{ y: 40, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6 }}
			>
				You caught them all!
			</motion.h2>

			<motion.p
				className="text-blush text-base sm:text-lg mb-6 sm:mb-10"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
			>
				Here's something special for you...
			</motion.p>

			<motion.div
				className="max-w-md w-full bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-5 sm:p-8 text-center mx-4"
				initial={{ y: 30, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 1.3, type: "spring" }}
				style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
			>
				<AnimatedMessage
					key={messageIndex}
					text={currentMessage}
				/>
			</motion.div>

			<motion.button
				onClick={nextMessage}
				className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-primary/20 border border-primary/40 text-primary-foreground font-medium hover:bg-primary/30 transition-colors"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				Another love note 💕
			</motion.button>
		</motion.div>
	);
};

/* ------------------ MESSAGE ANIMATION ------------------ */
const AnimatedMessage = ({ text }: { text: string }) => (
	<motion.p
		className="font-romantic text-2xl sm:text-3xl text-blush leading-relaxed"
		initial={{ opacity: 0, y: 15 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		{text}
	</motion.p>
);

export default CompletionScreen;