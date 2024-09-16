export default function Drawer({ children, isOpen, setIsOpen }: any) {
  return (
    <main
      className={
        ' fixed top-0  right-0 bottom-0 overflow-hidden z-[100] bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
      style={{
        zIndex: 11111,
        opacity: 1,
      }}
    >
      <section
        className={
          ' w-screen max-w-lg right-0 absolute bg-[#ffff]h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className='relative w-screen max-w-lg flex flex-col space-y-6 z-[1000] opacity-100 h-screen'>
          {children}
        </article>
      </section>
      <section
        className=' w-screen h-full cursor-pointer '
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </main>
  );
}
