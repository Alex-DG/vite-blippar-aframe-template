console.log('⚙️', 'BLIPPAR INITIALISATION')

// Refer API:Functions documentation for more details
WEBARSDK.Init()

// Sets the webar mode if not defined earlier or enable lazy mode in webar-mode parameter
// WEBARSDK.SetWebARMode("surface-tracking");

// Give a callback when the WebAR Stage <a-entity webar-stage> is ready  to display the 3d object
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
