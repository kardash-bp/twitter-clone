export const formatDate = (date: number) => {
  const formattedDate = new Date(date * 1000).toLocaleDateString('sr-RS')
  const formattedTime = new Date(date * 1000).toLocaleTimeString('sr-RS')
  return `${formattedDate} - ${formattedTime}`
}