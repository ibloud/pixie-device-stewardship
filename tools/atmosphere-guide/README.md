# Atmosphere guide source

Run npm ci and npm run build to check this maintained source locally. Before building, copy the repository-root assets atmosphere-orbit.jpg and made-sick-icon.svg into public/assets. The user-supplied icon is separate from upstream CC0 material.

The dedicated public deployment is https://atmosphere.loptrlab.com/ and is managed by https://github.com/ibloud/atmosphere-field-guide . Its Actions workflow fetches this source, copies the original guide images, applies canonical/social metadata and publishes static files through GitHub Pages. After editing the guide here, manually run that repository's Deploy Atmosphere guide workflow.

Do not overwrite the legacy root atmosphere.html redirect with a compiled guide once the domain migration is activated. /ecosystem/ remains the central project directory.
