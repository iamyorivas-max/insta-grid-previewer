import { toPng } from 'html-to-image';

export const downloadGrid = async (elementId: string, fileName: string = 'insta-grid-preview') => {
  const node = document.getElementById(elementId);
  if (!node) return;

  try {
    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: 2, // Higher resolution for better quality
      backgroundColor: '#ffffff', // Ensure white background
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Failed to download image', err);
  }
};