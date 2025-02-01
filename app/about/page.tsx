'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://cdn.iconscout.com/strapi/Usecase_2_d4184d6646.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 backdrop-blur-md rounded-full text-white mb-6">
            Established 2010
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Proton Medicare
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Revolutionizing healthcare accessibility for seniors across America
          </p>
        </motion.div>
      </section>

      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <span className="px-3 py-1 text-sm font-medium bg-accent/10 rounded-full text-accent-foreground mb-6 inline-block">
              Our Mission
            </span>
            <h2 className="text-4xl font-bold mb-6">Simplifying Healthcare</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in making healthcare accessible and understandable for everyone.
              Our commitment drives us to innovate and improve continuously.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparency',
                description: 'Clear communication and honest relationships with our members',
                icon: '✨'
              },
              {
                title: 'Innovation',
                description: 'Continuously improving our healthcare solutions',
                icon: '🔬'
              },
              {
                title: 'Support',
                description: '24/7 dedicated assistance for all our members',
                icon: '🤝'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeInUpVariants}
              >
                <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/5">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-3 py-1 text-sm font-medium bg-accent/10 rounded-full text-accent-foreground mb-6 inline-block">
                Our Story
              </span>
              <h2 className="text-4xl font-bold mb-6">A Decade of Excellence</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2010, Proton Medicare began with a simple idea: make Medicare
                accessible and understandable for everyone. Over the years, we've grown
                from a small startup to a trusted healthcare partner for thousands of
                seniors across the country.
              </p>
              <p className="text-lg text-muted-foreground">
                Our team of dedicated professionals works tirelessly to ensure that our
                members receive the best possible care and support, making us one of the
                most trusted names in Medicare services.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square"
            >
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  backgroundImage: 'url(https://cdn.iconscout.com/strapi/Usecase_2_d4184d6646.png)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}