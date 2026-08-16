---
permalink: /
title: "Tracking the Formation of Planets Through Numerical Simulations"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hey. I'm a member of the [RAPTOR group](https://flock.www3.mpia.de) of Dr. Mario Flock. We are specialized in high performance computing of the evolution of protoplanetary disks with radiative transfer, hydrodynamics, and magnetohydrodynamics (MHD) simulations.

The focus of my PhD lies in understanding how magnetic fields of different strengths influence the inner disk (<10 au) evolution and ultimately drive planet formation.

<figure>
  <img src="/images/background.png"
       alt="Simulation of the density and magnetic field evolution of a protoplanetary disk"
       style="width: 300%;">

  <figcaption>
    MHD simulation of the poloidal magnetic field (left) and density (right) evolution of a protoplanetary disk with logarithmic color scaling. The density is smeared out along the poloidal velocity stream via line integrated convolution. The disk is placed edge-on with its midplane being aligned along the horizontal.
  </figcaption>
</figure>

The following is a list of my main science projects, sorted by most recent.

The effect of realistic temperature profiles onto inner disk MHD evolution
------
Max-Planck-Institut für Astronomie (MPIA), Heidelberg, Germany - supervised by Dr. Mario Flock.

Magnetic fields generally do not affect the motion of fluids in our everyday lives. However, the inner regions of protoplanetary disks (including the region where Earth is located today) reach high temperatures of up to several thousand Kelvin, causing the material to become partially ionized and form a plasma. As a result, the omnipresent magnetic fields interact with the disks, which has a decisive impact on the evolution of the disk and the future planets. Using non-ideal MHD simulations with the PLUTO code, I am investigating how protoplanetary disks respond to different magnetic fields and how magnetic winds and magnetic flux differ. A novel approach is that, instead of simple power-law assumptions for the temperature profile, I use a realistic temperature profile inspired by radiative transfer simulations. These differ in particular in the region of the disk’s condensation front and produce significant differences in disk evolution. I have discovered and quantified that the magnetic wind is activated above a certain magnetic field strength and that the disk atmosphere can be divided into three dynamically distinct regions ([Bahrenberg and Flock, in prep.]()).



Predicting exoplanet interiors more accurately
------
Deutsches Zentrum für Luft- und Raumfahrt (DLR), Berlin, Germany. Supervised by Dr. Nicola Tosi.

Even though several thousand exoplanets have already been detected, in most cases only their mass and radius can be determined. Despite this limited information, it is possible to make statistical inferences about the planets’ internal composition. To this end, ExoMDN was developed, a neural network that was trained on millions of synthetic planets whose internal structure is known. I improved the atmospheric model of these synthetic planets and demonstrated that the new model results in significant differences in the mass-radius relationship. This paves the way for a more realistic assessment of the internal structure of exoplanets as part of the future PLATO mission (ESA).
The results of this work were presented at EGU25, Vienna, Austria in 2025 ([Baumeister, Bahrenberg et. al.](https://meetingorganizer.copernicus.org/EGU25/EGU25-15903.html)).


Simulating how warped protoplanetary disks occur in observations
------
Institut für Theoretische Astrophysik (ITA), Heidelberg, Germany. Supervised by Prof. Dr. Kees Dullemond.

Although often referred to as protoplanetary disks, many observations reveal significant deviations from a disk-like structure. One example are so-called “warped disks,” in which the inner and outer regions are misaligned but smoothly connected. This can result, for example, from embedded, inclined planets, stellar flybys, or strong magnetic fields at the inner edge. Scattered light observations reveal impressive interplay of light and shadow, depending on the exact shape of the object. I performed Monte Carlo radiative transfer simulations with RADMC-3D to produce synthetic images of several disk geometries, which allows us to trace the disk structure back from observed shadows. Furthermore, and for the first time, I combined hydrodynamic and radiative transfer simulations of the evolution of warped disks to predict how disks would evolve over time in observations. The hydrodynamical disk evolution was computed with dwarpy ([Kimmig, Dullemond, Bahrenberg, in prep.]()).


------
<figure>
  <video controls width="25%">
    <source src="/videos/test_video_rho.mp4" type="video/mp4">
  </video>
  <figcaption>
    Evolution of the density in the protoplanetary disk.
  </figcaption>
</figure>
-------