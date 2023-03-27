const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

async function main() {
  try {
    const position = await getPosition();
    console.log("Position récupérée:", position);

    // Lancez votre algorithme ici

  } catch (error) {
    console.error("Erreur lors de la récupération de la position:", error);
  }
}

main();