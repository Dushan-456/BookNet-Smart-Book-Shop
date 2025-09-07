import './Loading.css'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 gap-3 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm'>
      <div className="loading-blob"></div>
      <p>Loading..</p>
      <div className="progress"></div>
    </div>
  )
}

export default Loading
