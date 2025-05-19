console.log('⚙️ BLIPPAR INITIALISATION')

import {
  doorComponent,
  hiderMaterialComponent,
  sphereSkyboxComponent,
} from './components/portal'
AFRAME.registerComponent('door', doorComponent)
AFRAME.registerComponent('hider-material', hiderMaterialComponent)
AFRAME.registerComponent('sphere-skybox', sphereSkyboxComponent)

import { smoothFollowComponent } from './components/smooth-follow'
AFRAME.registerComponent('smooth-follow', smoothFollowComponent)

// Smoke
import { smokeSpreadComponent } from './components/smoke'
AFRAME.registerComponent('smoke-spread', smokeSpreadComponent)

// Run once DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('⚙️', 'DOMContentLoaded', 'WEBARSDK INIT...', WEBARSDK)

    // Initialize WebAR SDK
    WEBARSDK.Init()

    // Set callback when the stage is ready
    WEBARSDK.SetStageReadyCallback(() => {
      console.info('Stage is ready now!!!')
    })

    // Set guide view start/stop callbacks
    WEBARSDK.SetGuideViewCallbacks(
      function startGuideViewCallback() {
        console.log('Start(ed) hand guide animation')
      },
      function stopGuideViewCallback() {
        console.log('Stop(ped) hand guide animation')
      }
    )

    // Give a callback when the WebAR Marker <a-entity webar-marker> is ready  to track the marker image
    WEBARSDK.SetMarkerDetectedCallback((markerId) => {
      console.info('Marker is detected for marker id: ', markerId)
    })

    // Give a callback when the WebAR Marker <a-entity webar-marker> is lost
    WEBARSDK.SetMarkerLostCallback((markerId) => {
      console.info('Marker tracking is lost for marker id: ', markerId)
    })

    /**
     * Sets custom style for auto marker detection(auto-marker-detection = true):
     *  (1) Add your custom html layout for auto marker detection
     *  (2) May disable scan instruction if needed, by default it is true
     * @param {HTMLElement} custom division
     * @param {boolean} showScanInstructions set it to false to disable it
     */
    //WEBARSDK.SetAutoMarkerDetectionStyle(htmlElement, showScanInstructions)

    // Set callback for camera transition preparation
    WEBARSDK.SetPrepareForCameraTransitionCallback(() => {
      const deskenv = document.getElementById('deskenv')
      if (deskenv && deskenv.parentNode) {
        deskenv.parentNode.removeChild(deskenv)
      }
    })
  } catch (err) {
    console.error('❌ SDK initialization failed:', err.message, { error: err })
  }
})
