"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import {
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "@/features/cart/cartSelectors";
import { clearCart } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FLAT = 4.95;

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+()\-\s]{7,20}$/, "Enter a valid phone number"),
  address: z.string().trim().min(5, "Enter your street address"),
  city: z.string().trim().min(2, "Enter your city"),
  postalCode: z.string().trim().min(3, "Enter your postal code"),
  paymentMethod: z.enum(["card", "paypal", "cod"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const PAYMENT_OPTIONS = [
  { value: "card", label: "Credit / Debit card" },
  { value: "paypal", label: "PayPal" },
  { value: "cod", label: "Cash on delivery" },
] as const;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (message === undefined) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-error">
      {message}
    </p>
  );
}

/**
 * Checkout form.
 *
 * React Hook Form owns form state and submission; Zod owns validation; Redux
 * supplies the cart and is cleared on success. Nothing from the form goes into
 * Redux, and no product data is copied out of TanStack Query into it.
 */
export function CheckoutForm() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const itemCount = useAppSelector(selectCartItemCount);
  const subtotal = useAppSelector(selectCartTotal);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "card",
    },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    dispatch(clearCart());
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="Order placed"
        description="Thanks for your purchase. A confirmation has been sent to your email."
        action={
          <Link
            href="/products"
            className="flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Continue shopping
          </Link>
        }
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Add a product before checking out."
        action={
          <Link
            href="/products"
            className="flex h-11 items-center rounded-full bg-brand px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Browse products
          </Link>
        }
      />
    );
  }

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const labelClass = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-line bg-paper-raised p-6"
      >
        <fieldset className="space-y-5">
          <legend className="text-lg font-semibold text-ink">
            Contact information
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className={labelClass}>
                Full name
              </label>
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                aria-invalid={errors.fullName ? "true" : "false"}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName")}
              />
              <FieldError id="fullName-error" message={errors.fullName?.message} />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="email-error" message={errors.email?.message} />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={errors.phone ? "true" : "false"}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
              />
              <FieldError id="phone-error" message={errors.phone?.message} />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5">
          <legend className="text-lg font-semibold text-ink">
            Shipping address
          </legend>

          <div>
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <Input
              id="address"
              type="text"
              autoComplete="street-address"
              aria-invalid={errors.address ? "true" : "false"}
              aria-describedby={errors.address ? "address-error" : undefined}
              {...register("address")}
            />
            <FieldError id="address-error" message={errors.address?.message} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <Input
                id="city"
                type="text"
                autoComplete="address-level2"
                aria-invalid={errors.city ? "true" : "false"}
                aria-describedby={errors.city ? "city-error" : undefined}
                {...register("city")}
              />
              <FieldError id="city-error" message={errors.city?.message} />
            </div>

            <div>
              <label htmlFor="postalCode" className={labelClass}>
                Postal code
              </label>
              <Input
                id="postalCode"
                type="text"
                autoComplete="postal-code"
                aria-invalid={errors.postalCode ? "true" : "false"}
                aria-describedby={
                  errors.postalCode ? "postalCode-error" : undefined
                }
                {...register("postalCode")}
              />
              <FieldError
                id="postalCode-error"
                message={errors.postalCode?.message}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-lg font-semibold text-ink">
            Payment method
          </legend>
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-line-strong px-3.5 py-3 text-sm text-ink transition-colors has-checked:border-ink hover:border-ink"
              >
                <input
                  type="radio"
                  value={option.value}
                  className="h-4 w-4 accent-ink"
                  {...register("paymentMethod")}
                />
                {option.label}
              </label>
            ))}
          </div>
          <FieldError
            id="paymentMethod-error"
            message={errors.paymentMethod?.message}
          />
        </fieldset>

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Placing order…
            </>
          ) : (
            `Place order · ${formatPrice(total)}`
          )}
        </Button>
      </form>

      <aside className="h-fit rounded-xl border border-line bg-paper-raised p-6 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-ink">Order summary</h2>

        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line bg-surface">
                {item.image !== "" && (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="line-clamp-2 text-sm font-medium text-ink">
                  {item.title}
                </span>
                <span className="text-xs text-ink-muted">
                  Qty {item.quantity}
                </span>
              </span>
              <span className="shrink-0 text-sm font-medium text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">
              Subtotal ({itemCount} {itemCount === 1 ? "unit" : "units"})
            </dt>
            <dd className="font-medium text-ink">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">Shipping</dt>
            <dd className="font-medium text-ink">
              {shipping === 0 ? "Free" : formatPrice(shipping)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt className="font-semibold text-ink">Total</dt>
            <dd className="font-bold text-ink">{formatPrice(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}