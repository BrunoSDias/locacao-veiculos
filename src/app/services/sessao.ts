class Sessao {
  public static setUsuario(id): void {
    localStorage.setItem("usuario", id);
  }

  public static getUsuario(): string {
    const usuarioId = localStorage.getItem("usuario");
    if (usuarioId) {
      return usuarioId;
    }
  }

  public static clearUsuario(): void {
    localStorage.removeItem("usuario");
  }
}

export default Sessao;