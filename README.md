# Particle Interference Patterns
![alt text](/demo/Demo.jpg)
This image may be of an outdated version

This is a simulation of photons with wavelength $\lambda$ hitting a matrix of photomultipliers behind a double slit with distance $a$. The slits have a width of $l$ and the distance between their middle is $g$. 

## How to use
Just download the Project using the Github website or run this command if you have git installed:
```bash
git clone https://github.com/Gunzette/ParticleInterferencePatterns.git
```
Then, just open `index.html`.

## Explaination

This repository uses a trick to randomise the pattern:

1. Generate an Integer $x$ coordinate with the width of the screen as its maximum.
2. Convert said coordinate to be centered around the highest peak ($d$): $d = x - \text{center}$.
3. Compute the angle $\theta$ at distance $d$ using screen-distance $a$.
4. Compute the intensity $I$ at angle $\theta$ ([Formula from Wikipedia](https://en.wikipedia.org/wiki/Double-slit_experiment#Classical_wave-optics_formulation)):
```math
I(\theta) = I_{max} \cdot cos^2 \left[ \frac{\pi g \sin(\theta)}{\lambda} \right] \cdot sinc^2 \left[ \frac{\pi l \sin(\theta)}{\lambda} \right]
```
5. Compute the "angle width" in relation to the center at $d$ using (because $d$ represents the pixels area):
```math
w(d) = \theta(d + 0.5) - \theta(d - 0.5) \\
w_0(d) = \frac{w(d)}{w(0)}
```
6. Divide the intensity (with $I_{max} = 1$) by the "angle width", as bigger area means smaller relative intensity.
7. Use the new intensity as a probability for the photon, as this emulates the behavior of using Intensity as a PDF, but backwards.
8. Generate a number $r$ between $0$ and $1$ (uniformly distributed) to compare to the intensity. If $r$ is bigger than the intensity, don't display a point.
