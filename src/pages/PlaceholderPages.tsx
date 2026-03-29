import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  User, 
  FileText, 
  HelpCircle, 
  CreditCard, 
  ShieldCheck, 
  MessageSquare,
  Rocket
} from 'lucide-react';

const PagePlaceholder: React.FC<{ title: string, icon: any, desc: string }> = ({ title, icon: Icon, desc }) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-cream p-12 rounded-[3rem] shadow-2xl border border-white/20 max-w-2xl w-full flex flex-col items-center space-y-8 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-electric/10 transition-colors duration-500"></div>
      
      <div className="w-28 h-28 bg-electric/10 rounded-3xl flex items-center justify-center text-electric shadow-xl shadow-electric/5 relative z-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
        <Icon size={56} />
      </div>
      
      <div className="space-y-4 relative z-10">
        <h1 className="text-4xl font-black text-navy uppercase tracking-tighter">{title}</h1>
        <p className="text-slate-500 font-medium leading-relaxed text-lg">{desc}</p>
      </div>
      
      <button className="bg-electric hover:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm tracking-[0.1em] shadow-xl shadow-electric/20 transition-all active:scale-95 relative z-10 uppercase">
        Explorer la section
      </button>
    </motion.div>
  </div>
);

export const Analytics = () => <PagePlaceholder title="Analytics" icon={BarChart2} desc="Visualisez vos données de performance, l'utilisation des modèles et les statistiques de prédiction détaillées." />;
export const Profile = () => <PagePlaceholder title="Profil Utilisateur" icon={User} desc="Gérez vos informations personnelles, vos préférences de notification et vos clés API." />;
export const APIDocs = () => <PagePlaceholder title="Documentation API" icon={FileText} desc="Explorez notre API REST et ONNX avec Swagger. Intégrez AudioClass AI dans vos propres applications." />;
export const HelpCenter = () => <PagePlaceholder title="Centre d'Aide" icon={HelpCircle} desc="Tutoriels, guides de démarrage et support technique pour vous aider à tirer le meilleur parti de la plateforme." />;
export const Billing = () => <PagePlaceholder title="Facturation & Abonnements" icon={CreditCard} desc="Gérez vos factures Stripe, vos méthodes de paiement et vos plans d'abonnement Pro." />;
export const Admin = () => <PagePlaceholder title="Administration" icon={ShieldCheck} desc="Modération des modèles, statistiques utilisateurs et gestion de la plateforme (Réservé aux administrateurs)." />;
export const Forum = () => <PagePlaceholder title="Communauté & Forum" icon={MessageSquare} desc="Échangez avec d'autres ingénieurs, partagez vos astuces et obtenez des badges de contributeur." />;
export const Onboarding = () => <PagePlaceholder title="Bienvenue !" icon={Rocket} desc="Suivez notre guide rapide en 3 étapes pour configurer votre premier modèle de classification audio." />;
