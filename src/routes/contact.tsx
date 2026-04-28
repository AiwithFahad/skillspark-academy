import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/landing/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Academy LMS" },
      { name: "description", content: "Get in touch with the Academy LMS team — support, partnerships, or general questions." },
      { property: "og:title", content: "Contact us — Academy LMS" },
      { property: "og:description", content: "Get in touch with the Academy LMS team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Thanks — we'll get back to you within one business day.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  };

  return (
    <PageShell
      eyebrow="Contact"
      title="Let's talk"
      description="Questions about the platform, pricing, or partnering with your academy? Drop us a line and a real person will reply."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "hello@academy-lms.com" },
            { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: MapPin, label: "Office", value: "221B Learning Lane, Remote-first" },
          ].map((c) => (
            <Card key={c.label} className="border-border/60">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="mt-0.5 text-sm font-medium">{c.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/60">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us a bit about what you're working on..." required />
              </div>
              <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Sending..." : "Send message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}