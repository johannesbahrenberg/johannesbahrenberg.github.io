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

The effect of realistic, radiative transfer simualtion inspired, temperature profiles onto inner disk MHD evolution
------
Max-Planck-Instiut für Astronomie (MPIA), Heidelberg, Germany - supervised by Dr. Mario Flock.



Predicting exoplanet interiors more accurately
------
Deutsches Zentrum für Luft- und Raumfahrt (DLR), Berlin, Germany. Supervised by Dr. Nicola Tosi.

Even though several thousand exoplanets have already been detected, in most cases only their mass and radius can be determined. Despite this limited information, it is possible to make statistical inferences about the planets’ internal composition. To this end, ExoMDN ([Baumeister and Tosi 2023)](https://www.aanda.org/articles/aa/pdf/2023/08/aa46216-23.pdf)) was developed—a neural network that was trained on millions of synthetic planets whose internal structure is known. I improved the atmospheric model of these synthetic planets and demonstrated that the new model results in significant differences in the mass-radius relationship. This paves the way for a more realistic assessment of the internal structure of exoplanets as part of the future PLATO mission (ESA).
The results of this work were presented at EGU25, Vienna, Austria in 2025 ([Baumeister, Bahrenberg et. al.](https://ascl.net/2503.013)).


Simulating how warped protoplanetary disks occur in observations
------
Institut für Theoretische Astrophysik (ITA), Heidelberg, Germany. Supervised by Prof. Dr. Kees Dullemond.




------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one Markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a Markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each Markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

The repository includes [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual Markdown files that will be properly formatted for the Academic Pages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the Markdown files, then commit and push them to the GitHub repository.


For more info
------
More info about configuring Academic Pages can be found in [the guide](https://academicpages.github.io/markdown/), the [growing wiki](https://github.com/academicpages/academicpages.github.io/wiki), and you can always [ask a question on GitHub](https://github.com/academicpages/academicpages.github.io/discussions). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
