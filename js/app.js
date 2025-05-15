console.log('⚙️ BLIPPAR INITIALISATION')

// Wait until the SDK is available
const waitForSDK = () =>
  new Promise((resolve) => {
    const check = () => {
      if (typeof WEBARSDK !== 'undefined') {
        console.log('✅ SDK loaded successfully')
        resolve()
      } else {
        console.log('⏳ Waiting for SDK to load...')
        setTimeout(check, 100)
      }
    }
    check()
  })

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
