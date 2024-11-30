
export const getUserNameFromToken = (token) => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.name || null;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };