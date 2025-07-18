import { h, render, useEffect, Fragment } from "../../assets/preact.esm.js"
import Link from './Link.jsx';
import SidebarTagsList from "../../features/tags/SidebarTagsList.jsx";
import FocusSwitcher from "../../features/focus/FocusSwitcher.jsx";
import SearchMenu from "../../features/search/SearchMenu.jsx";
import SettingsModal from "../../features/settings/SettingsModal.jsx";
import { NotesIcon, SearchIcon, NewIcon, ArchiveIcon, TrashIcon, BoardIcon, SettingsIcon, TemplatesIcon } from "./Icon.jsx";
import "./Sidebar.css";

export default function Sidebar({ isOpen, onSidebarClose, focusModes, tags }) {
  useEffect(() => {
    function handleNavigationChange() {
      if (isOpen) {
        onSidebarClose();
      }
    }

    window.addEventListener('navigate', handleNavigationChange);

    return () => {
      window.removeEventListener('navigate', handleNavigationChange);
    };
  }, [isOpen, onSidebarClose]);

  function handleSearchClick() {
    render(<SearchMenu />, document.querySelector('.modal-root'));
  }

  function handleSettingsClick() {
    render(<SettingsModal />, document.querySelector('.modal-root'));
  }

  function handleBackdropClick() {
    if (isOpen) {
      onSidebarClose();
    }
  }

  const currentSearchParams = new URLSearchParams(window.location.search);
  const focusId = currentSearchParams.get("focusId");
  const notesLink = focusId ? `/notes/?focusId=${focusId}` : "/notes/";

  return (
    <>
      <div className={`sidebar-backdrop-container ${isOpen ? 'is-open' : ''}`} onClick={handleBackdropClick}>&nbsp;</div>
      <div className={`sidebar-container ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar-fixed">
          <FocusSwitcher focusModes={focusModes} />

          <Link className="sidebar-button new" to="/notes/new" shouldPreserveSearchParams>
            <NewIcon />
            New
          </Link>
          <div className="sidebar-button search" onClick={handleSearchClick}>
            <SearchIcon />
            Search
          </div>
          <Link className="sidebar-button notes" to={notesLink}>
            <NotesIcon />
            Notes
          </Link>
          {/* <Link className="sidebar-button" to="/">
          <BoardIcon />
          Boards
        </Link>
        <div className="sidebar-button" activeClassName="is-active" to="/archives" shouldPreserveSearchParams>
          <TemplatesIcon />
          Templates
        </div>*/}
          <Link className="sidebar-button archives" activeClassName="is-active" to="/notes/?isArchived=true">
            <ArchiveIcon />
            Archives
          </Link>
          <Link className="sidebar-button trash" activeClassName="is-active" to="/notes/?isDeleted=true">
            <TrashIcon />
            Trash
          </Link>
          <div className="sidebar-button settings" onClick={handleSettingsClick}>
            <SettingsIcon />
            Settings
          </div>
        </div>

        <div className="sidebar-scrollable">
          <div className="sidebar-section">
            <SidebarTagsList tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
}
