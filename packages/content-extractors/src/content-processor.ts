export function processTextIntoChuncks(
  text: string,
  chunckSize: number = 1000
): string[] {
  if (!text) {
    return [];
  }

  const paragraphs = text.split(/\n\n+/);
  const chuncks: string[] = [];
  let currentChunck = "";

  for (const paragraph of paragraphs) {
    if (
      currentChunck.length + paragraph.length > chunckSize &&
      currentChunck.length > 0
    ) {
      chuncks.push(currentChunck.trim());
      currentChunck = "";
    }

    currentChunck += paragraph + "\n\n";
  }

  if (currentChunck.trim().length > 0) {
    chuncks.push(currentChunck.trim());
  }

  return chuncks;
}
