export default function Footer() {
  
 const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <p>&copy; {currentYear} Tech-Challenge Fase 3. Todos os direitos reservados a Pedro Toni, Pedro Henrique, Gustavo, Rodrigo, Wesley.</p>
    </footer>
  );
}
