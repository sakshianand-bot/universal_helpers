import React from 'react'
import { Particles } from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function GradientParticles() {
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const particlesOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: '#ffffff',
      },
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 2,
      },
    },
    detectRetina: true,
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0"
    />
  )
}
