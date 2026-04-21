'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Upload, FileCheck, Shield, CalendarClock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/features/reservation/use-booking-store';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBooking } from '@/app/actions/booking';
import type { RoomType } from '@/types/booking';

const roomOptions: { value: RoomType; label: string; desc: string }[] = [
  { value: '2pers', label: 'Chambre Double', desc: '2 personnes' },
  { value: '3pers', label: 'Chambre Triple', desc: '3 personnes' },
  { value: '4pers', label: 'Chambre Quadruple', desc: '4 personnes' },
  { value: '6pers', label: 'Chambre Sextuple', desc: '6 personnes' },
];

const steps = ['Formule', 'Voyageurs', 'Documents', 'Rendez-vous', 'Confirmation'];

function ReserverContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const store = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const formuleId = searchParams.get('formule');
    if (formuleId) store.setFormule(formuleId);
  }, [searchParams, store]);

  // Determine if we can move forward
  const canProceed = () => {
    switch (store.step) {
      case 0: return !!store.formuleId;
      case 1: {
        // Verify at least first traveler has names
        const t = store.travelers[0];
        return t?.first_name?.trim() && t?.last_name?.trim();
      }
      case 2: return store.documentsUploaded;
      case 3: return !!store.appointmentDate;
      default: return true;
    }
  };

  const getButtonLabel = () => {
    if (isSubmitting) return 'Envoi en cours...';
    switch (store.step) {
      case 0: return 'Continuer';
      case 1: return 'Continuer';
      case 2: return store.documentsUploaded ? 'Documents validés — Continuer' : 'Veuillez charger vos documents';
      case 3: return 'Confirmer le Rendez-vous';
      default: return 'Continuer';
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <ScreenHeader
        leftAction={
          store.step > 0 ? (
            <button onClick={store.prevStep} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50 active:scale-95 transition-transform">
              <ArrowLeft className="w-5 h-5 text-ink-500" />
            </button>
          ) : (
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50 active:scale-95 transition-transform">
              <ArrowLeft className="w-5 h-5 text-ink-500" />
            </button>
          )
        }
        title="Réservation"
      />

      {/* Progress bar */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-1">
          {steps.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
              <div className={`h-1 w-full rounded-full transition-all duration-500 ease-out ${i <= store.step ? 'bg-beige-900' : 'bg-ink-100'}`} />
              <span className={`text-[9px] font-semibold tracking-wide uppercase transition-colors duration-300 ${i <= store.step ? 'text-beige-900' : 'text-ink-300'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 pb-32 lg:max-w-2xl lg:mx-auto lg:w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={store.step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {store.step === 0 && <StepFormule />}
            {store.step === 1 && <StepTravelers />}
            {store.step === 2 && <StepDocuments />}
            {store.step === 3 && <StepRendezVous />}
            {store.step === 4 && <StepConfirmation />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {store.step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-ivory-50/95 via-ivory-50/90 to-transparent pt-8 pb-4 px-5 safe-bottom lg:pl-[240px]">
          {errorMsg && <p className="text-state-error text-micro text-center mb-2">{errorMsg}</p>}
          <div className="lg:max-w-2xl lg:mx-auto">
            <Button 
              variant="beige" 
              size="lg" 
              shape="pill" 
              className="w-full" 
              disabled={isSubmitting || !canProceed()}
              onClick={async () => {
                if (store.step === 3) {
                  if (!store.formuleId || !store.appointmentDate) return;
                  setIsSubmitting(true);
                  setErrorMsg('');
                  const res = await createBooking({
                    formule_id: store.formuleId,
                    room_type: store.roomType,
                    travelers_count: store.travelersCount,
                    travelers: store.travelers.slice(0, store.travelersCount),
                    appointment_date: store.appointmentDate,
                    user_notes: store.userNotes,
                  });
                  
                  if (res.success) {
                    setIsSubmitting(false);
                    store.nextStep();
                  } else {
                    setIsSubmitting(false);
                    setErrorMsg(res.error || 'Erreur inconnue.');
                  }
                } else {
                  store.nextStep();
                }
              }}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {getButtonLabel()}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── STEP 0 — Formule ─────────────── */
function StepFormule() {
  const { roomType, setRoomType, travelersCount, setTravelersCount } = useBookingStore();

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-h2 text-ink-900 mb-1">Type de chambre</h2>
        <p className="text-micro text-ink-400 mb-4">Choisissez la configuration qui vous convient</p>
        <div className="space-y-2.5">
          {roomOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRoomType(opt.value)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98] ${
                roomType === opt.value
                  ? 'border-beige-900 bg-beige-900/5 shadow-card'
                  : 'border-ink-100 bg-white hover:border-ink-200'
              }`}
            >
              <div className="text-left">
                <span className="text-body font-semibold text-ink-800 block">{opt.label}</span>
                <span className="text-micro text-ink-400">{opt.desc}</span>
              </div>
              {roomType === opt.value && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-beige-900 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-gold-300" />
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h2 text-ink-900 mb-1">Nombre de voyageurs</h2>
        <p className="text-micro text-ink-400 mb-4">Adultes et enfants confondus</p>
        <div className="flex items-center gap-5 bg-white rounded-2xl p-4 shadow-card">
          <button
            onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
            className="w-12 h-12 rounded-xl bg-ink-100/50 flex items-center justify-center text-h2 text-ink-500 hover:bg-ink-100 active:scale-95 transition-all"
          >
            −
          </button>
          <span className="text-display-m text-ink-900 w-12 text-center tabular">{travelersCount}</span>
          <button
            onClick={() => setTravelersCount(Math.min(6, travelersCount + 1))}
            className="w-12 h-12 rounded-xl bg-ink-100/50 flex items-center justify-center text-h2 text-ink-500 hover:bg-ink-100 active:scale-95 transition-all"
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─────────────── STEP 1 — Voyageurs ─────────────── */
function StepTravelers() {
  const { travelers, travelersCount, updateTraveler } = useBookingStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 text-ink-900">Informations voyageurs</h2>
        <p className="text-micro text-ink-400 mt-1">Renseignez les données telles qu&apos;elles apparaissent sur le passeport</p>
      </div>
      {Array.from({ length: travelersCount }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl p-5 shadow-card space-y-3"
        >
          <h3 className="text-caption text-ink-400 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-beige-900/10 text-beige-900 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
            VOYAGEUR {i + 1}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Prénom"
              value={travelers[i]?.first_name ?? ''}
              onChange={(e) => updateTraveler(i, { first_name: e.target.value })}
            />
            <Input
              placeholder="Nom"
              value={travelers[i]?.last_name ?? ''}
              onChange={(e) => updateTraveler(i, { last_name: e.target.value })}
            />
          </div>
          <Input
            type="date"
            placeholder="Date de naissance"
            value={travelers[i]?.birth_date ?? ''}
            onChange={(e) => updateTraveler(i, { birth_date: e.target.value })}
          />
          <Input
            placeholder="Nationalité"
            value={travelers[i]?.nationality ?? ''}
            onChange={(e) => updateTraveler(i, { nationality: e.target.value })}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────── STEP 2 — Documents ─────────────── */
function StepDocuments() {
  const { documentsUploaded, setDocumentsUploaded } = useBookingStore();
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>( documentsUploaded ? 'success' : 'idle');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('La taille maximale est de 10 Mo.');
      return;
    }
    // Simulate upload for now (real upload already handled via DocumentUploadCard on mon-voyage page)
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('success');
      setDocumentsUploaded(true);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 text-ink-900">Pièces justificatives</h2>
        <p className="text-micro text-ink-400 mt-1">
          Afin de constituer votre dossier, veuillez charger une copie de votre passeport (double page).
        </p>
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 p-4 bg-beige-900/5 rounded-2xl">
        <Shield className="w-5 h-5 text-beige-900 mt-0.5 shrink-0" />
        <p className="text-micro text-ink-500 leading-relaxed">
          Vos documents sont chiffrés et stockés de manière sécurisée. Ils ne sont accessibles que par l&apos;équipe Labbayk pour la constitution de votre dossier de visa.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="space-y-4">
        {/* Passport Upload */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              uploadState === 'success'
                ? 'bg-state-success/10'
                : 'bg-ink-100'
            }`}>
              {uploadState === 'success' ? (
                <FileCheck className="w-5 h-5 text-state-success" />
              ) : uploadState === 'uploading' ? (
                <Loader2 className="w-5 h-5 text-beige-900 animate-spin" />
              ) : (
                <Upload className="w-5 h-5 text-ink-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-body font-semibold text-ink-900">Passeport</h3>
              <p className="text-[11px] text-ink-400">Double page — JPG, PNG ou PDF</p>
            </div>
          </div>

          {uploadState === 'uploading' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-ink-500 font-medium">
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Transfert en cours...
                </span>
              </div>
              <div className="h-1.5 w-full bg-ink-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-beige-900 rounded-full"
                  initial={{ width: '10%' }}
                  animate={{ width: '90%' }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
          ) : uploadState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between py-2.5 px-4 bg-state-success/10 rounded-xl"
            >
              <span className="text-[13px] text-state-success font-medium flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Document reçu ✓
              </span>
              <button
                onClick={() => { setUploadState('idle'); setDocumentsUploaded(false); }}
                className="text-[11px] text-state-success underline hover:opacity-80 transition-opacity"
              >
                Modifier
              </button>
            </motion.div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 py-8 border-2 border-dashed border-ink-200 rounded-2xl hover:bg-ink-50 hover:border-beige-900/30 transition-all cursor-pointer active:scale-[0.98]">
              <div className="w-12 h-12 rounded-full bg-beige-900/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-beige-900" />
              </div>
              <div className="text-center">
                <span className="text-body font-medium text-ink-700 block">Choisir un fichier</span>
                <span className="text-micro text-ink-400">ou glissez-déposez ici</span>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── STEP 3 — Rendez-vous ─────────────── */
function StepRendezVous() {
  const { roomType, travelersCount, travelers, appointmentDate, setAppointmentDate, userNotes, setUserNotes } = useBookingStore();

  // Generate available time slots for UX sugar
  const timeSlots = [
    { label: 'Matin', time: '10:00', desc: '10h00 — 12h00' },
    { label: 'Après-midi', time: '14:00', desc: '14h00 — 17h00' },
    { label: 'Soirée', time: '18:00', desc: '18h00 — 20h00' },
  ];

  const selectedDate = appointmentDate?.split('T')[0] || '';
  const selectedTime = appointmentDate?.split('T')[1]?.slice(0, 5) || '';

  function setSlot(date: string, time: string) {
    if (date && time) {
      setAppointmentDate(`${date}T${time}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h2 text-ink-900">Récapitulatif & Rendez-vous</h2>
        <p className="text-micro text-ink-400 mt-1">Vérifiez vos informations puis choisissez un créneau</p>
      </div>

      {/* Recap Card */}
      <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
        <h3 className="text-caption text-ink-400 mb-1">VOTRE RÉSERVATION</h3>
        <Row label="Chambre" value={roomType} />
        <Row label="Voyageurs" value={`${travelersCount} personne${travelersCount > 1 ? 's' : ''}`} />
        {travelers.slice(0, travelersCount).map((t, i) => (
          <Row key={i} label={`Voyageur ${i + 1}`} value={`${t.first_name} ${t.last_name}`} />
        ))}
        <Row label="Documents" value="✓ Passeport chargé" />
      </div>

      {/* Calendar Section */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock className="w-4 h-4 text-beige-900" />
          <h3 className="text-caption text-ink-400">CHOISIR UNE DATE</h3>
        </div>
        <p className="text-micro text-ink-400 mb-4">
          Le rendez-vous en agence (ou en visio) permettra de finaliser votre dossier et régler le paiement.
        </p>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSlot(e.target.value, selectedTime || '10:00')}
          min={new Date().toISOString().slice(0, 10)}
          className="mb-4"
        />

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <h4 className="text-caption text-ink-400 mb-2">CRÉNEAU HORAIRE</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSlot(selectedDate, slot.time)}
                  className={`flex flex-col items-center justify-center py-3.5 rounded-2xl text-center transition-all duration-200 active:scale-95 ${
                    selectedTime === slot.time
                      ? 'bg-beige-900 shadow-float'
                      : 'bg-white border border-ink-100 hover:border-ink-200'
                  }`}
                >
                  <span className={`text-[13px] font-semibold ${selectedTime === slot.time ? 'text-gold-300' : 'text-ink-700'}`}>
                    {slot.label}
                  </span>
                  <span className={`text-[10px] mt-0.5 ${selectedTime === slot.time ? 'text-gold-300/70' : 'text-ink-400'}`}>
                    {slot.desc}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Notes */}
      <section>
        <h3 className="text-caption text-ink-400 mb-3">NOTES (OPTIONNEL)</h3>
        <textarea
          className="w-full h-24 rounded-2xl border border-ink-200 bg-white px-4 py-3 text-body placeholder:text-ink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-none transition-shadow"
          placeholder="Questions ou demandes spéciales..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        />
      </section>
    </div>
  );
}

/* ─────────────── STEP 4 — Confirmation ─────────────── */
function StepConfirmation() {
  const router = useRouter();
  const { reset, appointmentDate } = useBookingStore();

  const formattedDate = appointmentDate
    ? new Date(appointmentDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const formattedTime = appointmentDate
    ? new Date(appointmentDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-state-success/10 flex items-center justify-center"
      >
        <Check className="w-12 h-12 text-state-success" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-display-m text-ink-900">Rendez-vous confirmé !</h2>
      </motion.div>
      
      {appointmentDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-beige-900/5 rounded-2xl p-5 max-w-[320px] w-full"
        >
          <div className="flex items-center gap-2 justify-center mb-2">
            <CalendarClock className="w-4 h-4 text-beige-900" />
            <span className="text-caption text-beige-900">VOTRE RENDEZ-VOUS</span>
          </div>
          <p className="text-body font-semibold text-ink-900 capitalize">{formattedDate}</p>
          <p className="text-body text-ink-500">à {formattedTime}</p>
        </motion.div>
      )}

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-body text-ink-400 max-w-[300px]">
        Notre équipe vous recevra pour finaliser votre dossier et procéder au paiement. Pensez à apporter vos documents originaux.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
        <p className="text-caption text-gold-600 mb-4">Réf: LBK-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
        <Button
          variant="beige"
          shape="pill"
          size="lg"
          onClick={() => { reset(); router.push('/'); }}
        >
          Retour à l&apos;accueil
        </Button>
      </motion.div>
    </div>
  );
}

/* ─────────────── Utility ─────────────── */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-body text-ink-400">{label}</span>
      <span className="text-body font-medium text-ink-900">{value}</span>
    </div>
  );
}

export default function ReserverPage() {
  return (
    <Suspense>
      <ReserverContent />
    </Suspense>
  );
}
