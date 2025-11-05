import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    motivation: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Get SheetDB URL from environment variable
      const SHEETDB_URL = import.meta.env.VITE_SHEETDB_URL as string;
      
      if (!SHEETDB_URL) {
        throw new Error("Configuration error. Please contact support.");
      }
      
      const response = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            ...formData,
            // Prefix phone with single quote to prevent Google Sheets formula error
            phone: `'${formData.phone}`,
            timestamp: new Date().toISOString()
          }
        })
      });

      if (response.ok) {
        console.log("Form submitted successfully to SheetDB");
        setSubmitted(true);
        
        // Reset form after showing success message
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            location: "",
            experience: "",
            motivation: ""
          });
        }, 5000);
      } else {
        const errorText = await response.text();
        console.error("SheetDB submission failed:", errorText);
        throw new Error("Erreur lors de l'envoi. Vérifiez votre connexion et réessayez.");
      }
    } catch (error) {
      console.error("Error submitting form to SheetDB:", error);
      setError(error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    if (name === "phone") {
      // Remove non-digit characters
      const digits = value.replace(/\D/g, "");
      // Format as user types (e.g., +221 77 123 45 67)
      let formatted = digits;
      if (digits.length > 0) {
        if (digits.startsWith("221")) {
          // Senegal format
          formatted = `+221 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`.trim();
        } else if (digits.length <= 9) {
          // Short format
          formatted = digits.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4").trim();
        }
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  if (submitted) {
    return (
      <section id="register" className="relative px-6 py-32">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-2xl blur-2xl"></div>
            <div className="relative p-12 rounded-2xl border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-500/40 bg-gradient-to-b from-gray-900/80 to-black/80 dark:from-gray-900/80 dark:to-black/80 light:from-gray-50/90 light:to-white/90 backdrop-blur-xl">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 dark:text-emerald-400 light:text-emerald-600" />
                </motion.div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono tracking-tight">Candidature Reçue</h3>
                  <p className="text-gray-400 dark:text-gray-400 light:text-gray-700 leading-relaxed">
                    Nous examinerons votre candidature et vous recontacterons bientôt. 
                    Vérifiez votre email pour les prochaines étapes.
                  </p>
                </div>
                
                <div className="pt-4 text-emerald-400 dark:text-emerald-400 light:text-emerald-600 font-mono text-sm">
                  {"// console.log('Bienvenue au Bootcamp')"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="relative px-6 py-32">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-block text-emerald-400 dark:text-emerald-400 light:text-emerald-600 text-sm font-mono tracking-wider uppercase">
            Inscription
          </div>
          <h2 className="text-4xl md:text-5xl text-gray-100 dark:text-gray-100 light:text-gray-900 tracking-tight">
            Rejoignez la Prochaine Cohorte
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg">
            Places limitées. Postulez maintenant pour accélérer votre parcours de développeur.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-2xl blur-2xl"></div>
          <div className="relative p-8 sm:p-12 rounded-2xl border border-gray-800/80 dark:border-gray-800/80 light:border-gray-200/80 bg-gradient-to-b from-gray-900/50 to-black/50 dark:from-gray-900/50 dark:to-black/50 light:from-gray-50/80 light:to-white/80 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </motion.div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Nom Complet <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Votre nom complet"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Adresse Email <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="votre@email.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Numéro de Téléphone <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="+221 77 123 45 67"
                />
                <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs font-mono">
                  Format: +221 XX XXX XX XX ou 77 123 45 67
                </p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Localisation <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Dakar, Sénégal"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Niveau d'Expérience <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="ex: 1 an avec React & Node.js"
                />
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation" className="text-gray-300 dark:text-gray-300 light:text-gray-900 light:font-semibold font-mono text-sm">
                  Pourquoi Voulez-vous Rejoindre ? <span className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600">*</span>
                </Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  required
                  value={formData.motivation}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={5}
                  className="bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl resize-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Parlez-nous de vos objectifs et ce que vous espérez accomplir..."
                />
                <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs font-mono">
                  {formData.motivation.length}/500 caractères
                </p>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-black border-0 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 transition-all"
              >
                <span className="flex items-center justify-center gap-2 font-mono">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer la Candidature
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>

              {/* Privacy note */}
              <p className="text-gray-500 dark:text-gray-500 light:text-gray-700 text-center text-sm pt-2">
                <span className="font-mono text-emerald-400/70 dark:text-emerald-400/70 light:text-emerald-600/70">{"// "}</span>
                Vos informations sont protégées et utilisées uniquement pour les communications du bootcamp.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
