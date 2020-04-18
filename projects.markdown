---
layout: page
title: Projects
permalink: /projects/
---

I usually have a few side projects on the go at varying levels of completion, most of which can be found on my [GitHub page](https://github.com/tgrbrooks){:target="\_blank"}.

Below are some extra details on some of the more interesting ones.

![Algae Plotter](/assets/algae_logo.png){:class="img-responsive"}

This is a GUI based tool for plotting algae growth curves and measuring growth rates.

It was written in python and uses PyQt5 for the GUI and maplotlib for the plotting.

You can download a `dmg` image from this [Dropbox folder](https://www.dropbox.com/sh/pa48a3jmwdhks1o/AACyNKSP8AvDUff5IjPBasApa?dl=0){:target="\_blank"}.

You can also clone the code from [here](https://github.com/tgrbrooks/AlgaePlotter)

# Cross Section Plotter

This tool was written as part of my PhD exploring the interactions of neutrinos with matter.

It takes a flat ROOT tree containing reconstructed neutrino interaction simulations, calculates the expected rates and cross sections and performs statistical and systematic uncertainty evaluations.

## Features

The configuration options are briefly described in the `config.txt` file.

The main features of the configuration are:
* Plot multiple cross section predictions by specifying more than one `InputFile`
* Select neutrino interaction topologies
  * Neutrino flavour
  * Charged current or neutral current interactions
  * Select by final state topology or true interaction mode
  * Define a fiducial volume
  * Select based on particle containment
* Choose which stage of reconstruction to plot with `Stage`
  * Truth level information
  * Particle reconstruction efficiencies
  * Kinematic variable smearing
  * Reconstructed selection (parametrised based on full SBND simulations) (only for numuCC)
* Choose the kinematic variable to produce differential cross sections in (supports up to 2)
* Scale to desired protons on target (POT)
* Plot rate or cross section predictions
* Histogram binning options
  * Set ranges for each parameter
  * Set number of bins or provide bin edges
  * Define a maximum statistical error per bin for automatic rebinning
* Histogram style options
  * Stack histograms by true FSI, interaction type or neutrino type
  * Show error bars on the histogram or as a percentage error band below the histogram
* Statistical analysis
  * Calculate cross section, flux, detector, external background, and constant systematic uncertainties on both rate predictions and expected cross section measurements.
  * Handle statistical uncertainty scaling with POT.
  * Calculate goodness-of-fit between models using chi2 statistical test for correlated uncertainties.
* Plotting options
  * Plot rate and cross section predictions
  * Plot 1D slices of 2D histograms
  * Plot systematic universe variations
  * Plot covariance and correlation matrices
  * Plot selection efficiency and purity graphs
  * Plot response matrices

Find the code [here](https://github.com/tgrbrooks/AlgaePlotter){:target="\_blank"}.

# PhD Organiser

Short masters project for C++ Object Orientated Programming course.
A terminal based calendar/organiser for PhD students with no external dependencies.

## Features

* Save and load different calendars
* Create different types of events
  * Conferences
  * Lectures
  * Meetings
  * Presentations
  * Seminars
* Edit existing events
* Sort and search through events
* Display a calendar
* Keep daily and weekly logs and track issues
* Basic txt file editor

Find the code [here](https://github.com/tgrbrooks/PhDOrganiser){:target="\_blank"}.

# RoboAI (COMING SOON)

I'm just starting a project to bring my Raspberry Pi to life with deep learning.

Find the code [here](https://github.com/tgrbrooks/RoboAI){:target="\_blank"}.

<!--<div class="accordion" id="accordionProjects">
  <div class="card">
    <div class="card-header bg-dark" id="headingOne">
      <h6 class="mb-0 font-weight-bold">
        <a href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" class="d-block position-relative text-white collapsible-link py-2">Algae Plotter</a>
      </h6>
    </div>

    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionProjects">
      <img class="card-img-top" src="/assets/algae_logo.png" alt="Card image cap"> 
      <div class="card-body">
        About.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Cross Section Plotter
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionProjects">
      <div class="card-body">
        About.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          PhD Organiser
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionProjects">
      <div class="card-body">
        About
      </div>
    </div>
  </div>
</div>-->
