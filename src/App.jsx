import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScienceOfCurls from './views/ScienceOfCurls'
import ScienceOfCurlsOddity from './views/ScienceOfCurlsOddity'
import WavesDecoded from './views/WavesDecoded'

export default function App() {
  return (
    <BrowserRouter basename="/WavyHair">
      <Routes>
        <Route path="/" element={<WavesDecoded />} />
        <Route path="/magazine" element={<WavesDecoded />} />
        <Route path="/oddity" element={<ScienceOfCurlsOddity />} />
        <Route path="/chalk" element={<ScienceOfCurls />} />
      </Routes>
    </BrowserRouter>
  )
}
