'use client';

import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/providers/ToastProvider';
import {
  User,
  Shield,
  KeyRound,
  Bell,
  AlertTriangle,
  Check,
  X,
  Lock,
} from 'lucide-react';

export function SettingsClient() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState({
    fullName: (user?.user_metadata?.full_name as string) || 'Rohan Verma',
    email: user?.email || 'athlete@kinetiq.design',
    phone: '+91 98765 43210',
    preferredSize: '10.0',
    marketingOptIn: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'PREFERENCES SAVED',
        description: 'Your biometric fit profile and account details have been synchronized.',
        type: 'success',
      });
    }, 600);
  };

  const handlePasswordReset = () => {
    toast({
      title: 'SECURITY LINK DISPATCHED',
      description: `A cryptographic password reset link has been sent to ${profile.email}.`,
      type: 'default',
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE') {
      toast({
        title: 'CONFIRMATION MISMATCH',
        description: 'Please type DELETE exactly to authorize account decommissioning.',
        type: 'warn',
      });
      return;
    }

    toast({
      title: 'ACCOUNT SCHEDULED FOR PURGE',
      description: 'Your biometric records and credentials have been queued for de-registration.',
      type: 'warn',
    });

    setShowDeleteModal(false);
    signOut();
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="border-b border-line pb-4">
        <span className="micro-label text-smoke">IDENTITY & BIOMETRICS</span>
        <h2 className="font-display font-bold text-2xl uppercase tracking-tight">
          FIT PREFERENCES & SECURITY
        </h2>
      </div>

      {/* Biometric & Profile Form */}
      <div className="border border-line bg-paper p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <User className="w-5 h-5 text-ink" />
          <h3 className="font-display font-bold text-lg uppercase tracking-tight">
            BIOMETRIC PROFILE
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="micro-label text-smoke block mb-1.5">FULL LEGAL NAME</label>
              <input
                type="text"
                required
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-bone border border-line focus:outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="micro-label text-smoke block mb-1.5">AUTHENTICATED EMAIL</label>
              <input
                type="email"
                disabled
                value={profile.email}
                className="w-full px-3 py-2.5 bg-bone/50 border border-line text-smoke cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="micro-label text-smoke block mb-1.5">PHONE (+91)</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-3 py-2.5 bg-bone border border-line focus:outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="micro-label text-smoke block mb-1.5">PREFERRED US FOOTWEAR SIZE</label>
              <select
                value={profile.preferredSize}
                onChange={(e) => setProfile({ ...profile, preferredSize: e.target.value })}
                className="w-full px-3 py-2.5 bg-bone border border-line font-bold focus:outline-none focus:border-ink"
              >
                {['7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'].map((sz) => (
                  <option key={sz} value={sz}>
                    US {sz} (EU {Math.round(38 + parseFloat(sz) * 1.3)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Marketing Opt-In */}
          <div className="pt-4 border-t border-line/60 flex items-center justify-between">
            <div>
              <p className="font-bold text-ink uppercase">KINETIQ LAB DROP ALERTS</p>
              <p className="text-[11px] text-smoke">Receive early drop invitations, restock alerts, and laboratory telemetry.</p>
            </div>
            <input
              type="checkbox"
              checked={profile.marketingOptIn}
              onChange={(e) => setProfile({ ...profile, marketingOptIn: e.target.checked })}
              className="w-4 h-4 accent-ink cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" disabled={isSaving} className="h-11 px-6 text-xs font-bold">
              {isSaving ? 'SYNCHRONIZING...' : 'SAVE BIOMETRIC PROFILE'}
            </Button>
          </div>
        </form>
      </div>

      {/* Security & Authentication */}
      <div className="border border-line bg-paper p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <KeyRound className="w-5 h-5 text-ink" />
          <h3 className="font-display font-bold text-lg uppercase tracking-tight">
            CREDENTIAL SECURITY
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div>
            <p className="font-bold text-ink uppercase">ACCOUNT AUTHENTICATION CREDENTIALS</p>
            <p className="text-smoke text-[11px]">Password or OAuth link management via Supabase Auth</p>
          </div>
          <Button variant="secondary" size="sm" onClick={handlePasswordReset} className="h-10 text-xs">
            <Lock className="w-3.5 h-3.5 mr-1.5" />
            DISPATCH PASSWORD RESET LINK
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-clay/50 bg-clay/5 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-clay" />
          <h3 className="font-display font-bold text-lg uppercase tracking-tight text-clay">
            DANGER ZONE // PURGE ACCOUNT
          </h3>
        </div>

        <p className="font-mono text-xs text-smoke leading-relaxed">
          Permanent removal of account credentials, addresses, order history links, and biometric fit parameters.
          This action is irreversibly audited and non-reversible.
        </p>

        <Button
          variant="outline"
          onClick={() => setShowDeleteModal(true)}
          className="border-clay text-clay hover:bg-clay hover:text-paper text-xs h-10 font-bold"
        >
          REQUEST ACCOUNT DELETION
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-paper border border-clay w-full max-w-md shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display font-bold text-xl uppercase tracking-tight text-clay">
                CONFIRM ACCOUNT PURGE
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1.5 text-smoke hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-mono text-xs text-smoke leading-relaxed">
              To authorize complete deletion of your customer profile, please type <strong className="text-ink font-bold">DELETE</strong> below.
            </p>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-3 py-2 bg-bone border border-line font-mono text-sm focus:outline-none focus:border-clay"
            />

            <div className="flex gap-3">
              <Button
                variant="clay"
                className="flex-1 h-11 text-xs font-bold"
                onClick={handleDeleteAccount}
              >
                CONFIRM DELETION
              </Button>
              <Button
                variant="secondary"
                className="flex-1 h-11 text-xs"
                onClick={() => setShowDeleteModal(false)}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
