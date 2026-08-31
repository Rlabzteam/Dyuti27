import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { Rajagiri } from '@/pages/Rajagiri';
import { CallForPapers } from '@/pages/CallForPapers';
import { Accommodation } from '@/pages/Accommodation';
import { Attractions } from '@/pages/Attractions';
import { Travel } from '@/pages/Travel';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { NotFound } from '@/pages/NotFound';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Homepage */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          {/* About / Rajagiri Host Institution */}
          <Route path="rajagiri" element={<Rajagiri />} />
          <Route path="about" element={<Rajagiri />} />

          {/* Call for Papers & Submissions */}
          <Route path="call_for_papers" element={<CallForPapers />} />
          <Route path="call-for-papers" element={<CallForPapers />} />
          <Route path="callforpapers" element={<CallForPapers />} />
          <Route path="cfp" element={<CallForPapers />} />

          {/* Accommodation & Delegate Stay */}
          <Route path="accomodation" element={<Accommodation />} />
          <Route path="accommodation" element={<Accommodation />} />
          <Route path="hotels" element={<Accommodation />} />
          <Route path="stay" element={<Accommodation />} />

          {/* Attractions / Sights */}
          <Route path="attractions" element={<Attractions />} />
          <Route path="kochi" element={<Attractions />} />
          <Route path="sights" element={<Attractions />} />
          <Route path="explore" element={<Attractions />} />

          {/* Travel & Venue Directions */}
          <Route path="travel" element={<Travel />} />
          <Route path="venue" element={<Travel />} />
          <Route path="directions" element={<Travel />} />
          <Route path="location" element={<Travel />} />

          {/* Gallery / Archive */}
          <Route path="gallery" element={<Gallery />} />
          <Route path="photos" element={<Gallery />} />
          <Route path="archive" element={<Gallery />} />

          {/* Contact Secretariat */}
          <Route path="contactus" element={<Contact />} />
          <Route path="contact" element={<Contact />} />
          <Route path="secretariat" element={<Contact />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
