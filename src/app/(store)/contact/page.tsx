'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/providers/ToastProvider';

export default function ContactPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    category: 'order',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'INCOMPLETE DATA',
        description: 'Please complete all required fields.',
        type: 'warn',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: 'INQUIRY TRANSMITTED',
        description: 'Concierge response dispatched within 4 operational hours.',
        type: 'success',
      });
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <section className="border-b border-line pb-12 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="acid">SUPPORT & ATELIER</Badge>
          <span className="micro-label text-smoke">RESPONSE TIME: &lt; 4 HOURS</span>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tighter leading-[0.92]">
          CONNECT WITH
          <br />
          <span className="text-smoke">KINETIQ ENGINEERING.</span>
        </h1>
        <p className="font-mono text-sm text-smoke max-w-2xl">
          Direct communication channels to our customer concierge, product engineering team, and Bengaluru atelier.
        </p>
      </section>

      {/* Grid: Details + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="border border-line bg-paper p-6 space-y-6">
            <h2 className="font-display font-bold text-xl uppercase tracking-tight">KINETIQ ATELIER // HQ</h2>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">BENGALURU ENGINEERING LAB</div>
                  <div className="text-smoke">100 Feet Road, Indiranagar, Stage II</div>
                  <div className="text-smoke">Bengaluru, Karnataka 560038, India</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">ELECTRONIC COMMUNIQUE</div>
                  <div className="text-smoke">concierge@kinetiq.run</div>
                  <div className="text-smoke">press@kinetiq.run</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">DIRECT TELEMETRY / LINE</div>
                  <div className="text-smoke">+91 (80) 4920-8840</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-ink">OPERATIONAL DISPATCH HOURS</div>
                  <div className="text-smoke">Monday – Saturday: 09:00 – 19:00 IST</div>
                  <div className="text-smoke">Sunday: Emergency Dispatch Only</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-line bg-bone p-6 space-y-3 font-mono text-xs text-smoke">
            <div className="font-bold text-ink uppercase">// ORDER STATUS TRACKING</div>
            <p>
              Looking to track an active consignment? Enter your KINETIQ Order ID on our live tracking page.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full text-xs font-mono">
              <a href="/account/orders">OPEN CONSIGNMENT TRACKER →</a>
            </Button>
          </div>
        </div>

        {/* Right: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="border border-line bg-paper p-8">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 bg-acid/20 text-ink rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl uppercase tracking-tight">
                  INQUIRY TRANSMITTED
                </h3>
                <p className="font-mono text-xs text-smoke max-w-md mx-auto">
                  Ticket dispatched to our concierge team. A confirmation email has been logged at{' '}
                  <span className="text-ink font-bold">{formData.email}</span>.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', orderId: '', category: 'order', message: '' });
                  }}
                  variant="outline"
                  className="font-mono text-xs mt-4"
                >
                  SUBMIT ANOTHER INQUIRY
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="micro-label text-smoke">DIRECT TRANSMISSION</span>
                  <h2 className="font-display font-bold text-2xl uppercase tracking-tight mt-1">
                    LOG YOUR INQUIRY
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="micro-label text-smoke">FULL NAME *</label>
                    <Input
                      required
                      placeholder="Arjun Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="micro-label text-smoke">EMAIL ADDRESS *</label>
                    <Input
                      required
                      type="email"
                      placeholder="arjun@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="micro-label text-smoke">CONSIGNMENT / ORDER ID (OPTIONAL)</label>
                    <Input
                      placeholder="KNQ-2026-XXXX"
                      value={formData.orderId}
                      onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                      className="font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="micro-label text-smoke">INQUIRY CATEGORY</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full h-10 px-3 border border-line bg-bone text-xs font-mono focus:border-ink focus:outline-none"
                    >
                      <option value="order">Order Tracking & Fulfillment</option>
                      <option value="exchange">14-Day Exchange & Sizing</option>
                      <option value="product">Biomechanical & Sizing Inquiry</option>
                      <option value="payment">Cashfree PG & Invoicing</option>
                      <option value="corporate">Atelier & Bulk Orders</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="micro-label text-smoke">TECHNICAL SPECIFICATION / MESSAGE *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide details of your inquiry, order number, or sizing query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-line bg-bone text-xs font-mono focus:border-ink focus:outline-none resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-ink text-bone hover:bg-ink/90 font-mono text-xs h-11"
                >
                  {loading ? (
                    'TRANSMITTING INQUIRY...'
                  ) : (
                    <>
                      TRANSMIT INQUIRY TO CONCIERGE <Send className="w-3.5 h-3.5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
