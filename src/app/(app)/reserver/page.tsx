'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/features/reservation/use-booking-store';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createBooking } from '@/app/actions/booking';
import type { RoomType } from '@/types/booking';

const roomOptions: { value: RoomType; label: string }[] = [
  { value: '2pers', label: 'Chambre Double (2 pers.)' },
  { value: '3pers', label: 'Chambre Triple (3 pers.)' },
  { value: '4pers', label: 'Chambre Quadruple (4 pers.)' },
  { value: '6pers', label: 'Chambre Sextuple (6 pers.)' },
];

const steps = ['Formule', 'Voyageurs', 'Récapitulatif', 'Confirmation'];

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

  return (
    <div className="flex flex-col min-h-dvh">
      <ScreenHeader
        leftAction={
          store.step > 0 ? (
            <button onClick={store.prevStep} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50">
              <ArrowLeft className="w-5 h-5 text-ink-500" />
            </button>
          ) : (
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50">
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
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1 w-full rounded-full transition-colors duration-300 ${i <= store.step ? 'bg-beige-900' : 'bg-ink-100'}`} />
              <span className={`text-[10px] font-medium ${i <= store.step ? 'text-beige-900' : 'text-ink-300'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={store.step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {store.step === 0 && <StepFormule />}
            {store.step === 1 && <StepTravelers />}
            {store.step === 2 && <StepRecap />}
            {store.step === 3 && <StepConfirmation />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      {store.step < 3 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-ivory-50/90 backdrop-blur-xl border-t border-ink-100/30 px-5 py-4 safe-bottom">
          {errorMsg && <p className="text-state-error text-micro text-center mb-2">{errorMsg}</p>}
          <Button 
            variant="beige" 
            size="lg" 
            shape="pill" 
            className="w-full" 
            disabled={isSubmitting || !store.formuleId}
            onClick={async () => {
              if (store.step === 2) {
                if (!store.formuleId) return;
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
                
                if (res.success && res.bookingId) {
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
            {isSubmitting ? 'Validation...' : store.step === 2 ? 'Confirmer le Rendez-vous' : 'Continuer'}

          </Button>
        </div>
      )}
    </div>
  );
}

function StepFormule() {
  const { roomType, setRoomType, travelersCount, setTravelersCount } = useBookingStore();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-h2 text-ink-900 mb-4">Type de chambre</h2>
        <div className="space-y-2">
          {roomOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRoomType(opt.value)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                roomType === opt.value
                  ? 'border-beige-900 bg-beige-900/5'
                  : 'border-ink-100 bg-white hover:border-ink-200'
              }`}
            >
              <span className="text-body text-ink-700">{opt.label}</span>
              {roomType === opt.value && <Check className="w-5 h-5 text-beige-900" />}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-h2 text-ink-900 mb-4">Nombre de voyageurs</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))}
            className="w-12 h-12 rounded-xl border border-ink-200 flex items-center justify-center text-h2 text-ink-500 hover:bg-ink-100/50"
          >
            −
          </button>
          <span className="text-display-m text-ink-900 w-12 text-center tabular">{travelersCount}</span>
          <button
            onClick={() => setTravelersCount(Math.min(6, travelersCount + 1))}
            className="w-12 h-12 rounded-xl border border-ink-200 flex items-center justify-center text-h2 text-ink-500 hover:bg-ink-100/50"
          >
            +
          </button>
        </div>
      </section>
    </div>
  );
}

function StepTravelers() {
  const { travelers, travelersCount, updateTraveler } = useBookingStore();

  return (
    <div className="space-y-6">
      <h2 className="text-h2 text-ink-900">Informations voyageurs</h2>
      {Array.from({ length: travelersCount }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-4 shadow-card space-y-3">
          <h3 className="text-caption text-ink-400">VOYAGEUR {i + 1}</h3>
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
        </div>
      ))}
    </div>
  );
}

function StepRecap() {
  const { roomType, travelersCount, travelers, appointmentDate, setAppointmentDate, userNotes, setUserNotes } = useBookingStore();


  return (
    <div className="space-y-6">
      <h2 className="text-h2 text-ink-900">Récapitulatif</h2>
      <div className="bg-white rounded-xl p-4 shadow-card space-y-3">
        <Row label="Chambre" value={roomType} />
        <Row label="Voyageurs" value={`${travelersCount} personne${travelersCount > 1 ? 's' : ''}`} />
        {travelers.slice(0, travelersCount).map((t, i) => (
          <Row key={i} label={`Voyageur ${i + 1}`} value={`${t.first_name} ${t.last_name}`} />
        ))}
      </div>

      <section>
        <h3 className="text-caption text-ink-400 mb-3">DATE ET HEURE DU RENDEZ-VOUS</h3>
        <p className="text-micro text-ink-400 mb-4">
          Un rendez-vous en agence (ou visio) est nécessaire pour valider les pièces justificatives et finaliser le paiement.
        </p>
        <Input
          type="datetime-local"
          value={appointmentDate || ''}
          onChange={(e) => setAppointmentDate(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          required
        />
      </section>


      <section>
        <h3 className="text-caption text-ink-400 mb-3">NOTES (OPTIONNEL)</h3>
        <textarea
          className="w-full h-24 rounded-xl border border-ink-200 bg-white px-4 py-3 text-body placeholder:text-ink-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus resize-none"
          placeholder="Questions ou demandes spéciales..."
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        />
      </section>
    </div>
  );
}

function StepConfirmation() {
  const router = useRouter();
  const { reset } = useBookingStore();

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
      <h2 className="text-display-m text-ink-900">Demande envoyée !</h2>
      <p className="text-body text-ink-400 max-w-[300px]">
        Notre équipe vous contactera dans les plus brefs délais pour finaliser votre réservation.
      </p>
      <p className="text-caption text-gold-600">Réf: LBK-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
      <Button
        variant="beige"
        shape="pill"
        size="lg"
        className="mt-4"
        onClick={() => { reset(); router.push('/'); }}
      >
        Retour à l&apos;accueil
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
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
