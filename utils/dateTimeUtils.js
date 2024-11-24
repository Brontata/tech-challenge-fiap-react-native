exports.formatDate = (date) => {
    const dateFormated = new Date(date);
  
    try {
      const day = dateFormated.getDate().toString().padStart(2, "0");
      const month = (dateFormated.getMonth() + 1).toString().padStart(2, "0");
      const year = dateFormated.getFullYear().toString();
      const hours = dateFormated.getHours().toString().padStart(2, "0");
      const minutes = dateFormated.getMinutes().toString().padStart(2, "0");
  
      return `${day}/${month}/${year} - ${hours}:${minutes}`;
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "N/A";
    }
  };
