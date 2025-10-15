import { type HTMLAttributes, forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className = '', ...props }, ref) => (
		<div
			ref={ref}
			className={`rounded-2xl border border-green-100 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
			{...props}
		/>
	)
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className = '', ...props }, ref) => (
		<div
			ref={ref}
			className={`flex flex-col space-y-1.5 px-8 py-6 ${className}`}
			{...props}
		/>
	)
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
	({ className = '', ...props }, ref) => (
		<h3
			ref={ref}
			className={`text-lg font-bold leading-none tracking-tight ${className}`}
			{...props}
		/>
	)
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className = '', ...props }, ref) => (
		<p
			ref={ref}
			className={`text-sm text-gray-500 ${className}`}
			{...props}
		/>
	)
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className = '', ...props }, ref) => (
		<div
			ref={ref}
			className={`px-8 pb-6 ${className}`}
			{...props}
		/>
	)
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className = '', ...props }, ref) => (
		<div
			ref={ref}
			className={`flex items-center px-8 py-4 border-t border-green-100 ${className}`}
			{...props}
		/>
	)
);
CardFooter.displayName = 'CardFooter';

