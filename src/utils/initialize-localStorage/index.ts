export const InitializeLocalStorage = () => {
  if (!localStorage.getItem('tasks')) {
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        {
          id: '1',
          title: 'Build UI app',
          columnTitle: 'Todo',
          iconColor: 'fill-[var(--circle-primary)]',
        },
        {
          id: '2',
          title: 'Folder structure',
          columnTitle: 'Doing',
          iconColor: 'fill-[var(--circle-secondary)]',
        },
        {
          id: '3',
          title: 'initialize & config project',
          columnTitle: 'done',
          iconColor: 'fill-[var(--circle-third)]',
        },
      ]),
    );
  }
};
