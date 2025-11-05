import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Send } from "lucide-react";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    experience: "",
    motivation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        location: "",
        experience: "",
        motivation: ""
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all"
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
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all"
                  placeholder="votre@email.com"
                />
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
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all"
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
                  className="h-12 bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl transition-all"
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
                  rows={5}
                  className="bg-black/40 dark:bg-black/40 light:bg-white light:border-gray-300 light:shadow-sm light:focus:border-emerald-600 light:focus:ring-2 light:focus:ring-emerald-600/20 border-gray-800 dark:border-gray-800 dark:focus:border-emerald-500/50 text-gray-100 dark:text-gray-100 light:text-gray-900 font-mono placeholder:text-gray-600 dark:placeholder:text-gray-600 light:placeholder:text-gray-500 rounded-xl resize-none transition-all"
                  placeholder="Parlez-nous de vos objectifs et ce que vous espérez accomplir..."
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="group w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-black border-0 rounded-xl"
              >
                <span className="flex items-center justify-center gap-2 font-mono">
                  Envoyer la Candidature
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
