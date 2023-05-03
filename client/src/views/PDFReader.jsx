import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import ngrokUrl from '../utilities/ngrokUrl';

export default function JobList() { 
    const [pdfLoaded, setPdfLoaded] = useState(false);
    const access_token = localStorage.getItem('access_token')
    const { fileCode } = useParams()


    useEffect(() => {
      document.addEventListener('adobe_dc_view_sdk.ready', () => {
        // Set flag to indicate that PDF Embed API is ready
        setPdfLoaded(true);
      });
  
      // Load PDF Embed API script
      const script = document.createElement('script');
      script.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
      script.async = true;
      document.head.appendChild(script);
  
      return () => {
        document.head.removeChild(script);
      };
    }, []);


  
    useEffect(() => {
      if (pdfLoaded) {
        // PDF Embed API is ready, preview PDF
        const adobeDCView = new AdobeDC.View({ clientId: process.env.REACT_APP_clientId, divId: 'adobe-dc-view' });
        adobeDCView.previewFile({
          content: { location: { url: `${ngrokUrl}/file/${access_token}/${fileCode}` } },
          metaData: { fileName: fileCode }
        });

   
      }
    }, [pdfLoaded]);

    


   


    return (
        <>
        <div id="adobe-dc-view" style={{height:"90vh"}}></div>      
        </>

    )
}