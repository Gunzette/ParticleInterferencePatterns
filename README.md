# Particle Interference Patterns

This is a simulation of photons with wavelength $\lambda$ hitting a matrix of photomultipliers behind a double slit with distance $a$. The slits have a width of $b$ and the distance between their middle is $g$. 

## Explaination

This repository uses a trick to randomise the pattern:

1. Generate an Integer $x$ coordinate with the width of the screen as its maximum.
2. Convert said coordinate to be centered around the highest peak ($d$): $d = x - \text{center}$.
3. Compute the angle $\theta$ at distance $d$ using screen-distance $a$.
4. Compute the intensity $I$ at angle $\theta$ ([Formula from Wikipedia](https://en.wikipedia.org/wiki/Double-slit_experiment#Classical_wave-optics_formulation)):
```math
I(\theta) = I_{max} \cdot cos^2 \left[ \frac{\pi g \sin(\theta)}{\lambda} \right] \cdot sinc^2 \left[ \frac{\pi b \sin(\theta)}{\lambda} \right]
```
5. Use the intensity (with $I_{max} = 1$) as a probability for the photon, as this emulates the behavior of using Intensity as a PDF, but backwards.
6. Generate a number $r$ between $0$ and $1$ (uniformly distributed) to compare to the intensity. If $r$ is bigger than the intensity, don't display a point.
