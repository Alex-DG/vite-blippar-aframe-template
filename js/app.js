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

    WEBARSDK.SetStageReadyCallback(() => {
      console.info('Stage is ready now!!!')
    })

    WEBARSDK.SetGuideViewCallbacks(
      (startGuideViewCallback = () => {
        console.log(' Start(ed) hand guide animation')
      }),

      (stopGuideViewCallback = () => {
        console.log(' Stop(ped) hand guide animation')
      })
    )

    WEBARSDK.SetPrepareForCameraTransitionCallback(() => {
      deskenv.parentNode.removeChild(deskenv)
    })
  } catch (err) {
    console.error('❌ SDK initialization failed:', err.message, { error: err })
  }
})
