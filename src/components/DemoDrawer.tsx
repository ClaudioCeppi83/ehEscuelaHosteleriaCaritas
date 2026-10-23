import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  RotateCcw,
  Trash2,
  Calendar,
  Users,
  Search,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  Utensils,
  Filter,
} from 'lucide-react';
import { useMockStore } from '../context/MockStoreContext';
import { useToast } from '../context/ToastContext';
import { Reservation, ReservationStatus } from '../types';

interface DemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const DemoDrawer: React.FC<DemoDrawerProps> = ({ isOpen, onClose, onOpen }) => {
  const {
    reservations,
    contacts,
    updateReservationStatus,
    deleteReservation,
    resetToSeedData,
    clearAllReservations,
    generateIcsCalendar,
  } = useMockStore();

  const toast = useToast();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [activeTab, setActiveTab] = useState<'reservations' | 'contacts'>('reservations');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all');
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  // Funciones de saneamiento defensivo de atributos href
  const sanitizePhoneForHref = (phone: string): string => {
    return phone.replace(/[^\d+]/g, '');
  };

  const sanitizeEmailForHref = (email: string): string => {
    return encodeURIComponent(email.trim());
  };

  // Atajo de teclado global cuando está cerrado: Ctrl+Shift+D o Cmd+Shift+D
  useEffect(() => {
    const handleGlobalOpen = (e: KeyboardEvent) => {
      if (!isOpen && (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        onOpen();
        toast.info('Consola del Maître activada mediante atajo Ctrl+Shift+D', 'Modo Maître');
      }
    };

    window.addEventListener('keydown', handleGlobalOpen);
    return () => window.removeEventListener('keydown', handleGlobalOpen);
  }, [isOpen, onOpen, toast]);

  // Accesibilidad: Focus trap para tecla Tab, cierre con Escape y restauración de foco
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  // Filtrado de reservas
  const filteredReservations = reservations.filter((res) => {
    const matchesSearch =
      res.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.phone.includes(searchTerm) ||
      res.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Manejo de cambio de estado
  const handleStatusChange = async (res: Reservation, newStatus: ReservationStatus) => {
    if (res.status === newStatus) return;
    setIsUpdatingId(res.id);
    try {
      await updateReservationStatus(res.id, newStatus);
      const statusLabels: Record<ReservationStatus, string> = {
        confirmed: 'Confirmada',
        in_preparation: 'En Preparación',
        table_assigned: 'Mesa Asignada',
        cancelled: 'Cancelada',
      };
      toast.success(
        `Reserva ${res.code} ahora está "${statusLabels[newStatus]}".`,
        'Estado de Sala Actualizado'
      );
    } catch {
      toast.error('No se pudo actualizar el estado de la reserva');
    } finally {
      setIsUpdatingId(null);
    }
  };

  // Manejo de eliminación
  const handleDelete = async (res: Reservation) => {
    if (window.confirm(`¿Seguro que deseas eliminar la reserva ${res.code} de ${res.customerName}?`)) {
      try {
        await deleteReservation(res.id);
        toast.info(`Reserva ${res.code} eliminada de la sala.`, 'Bandeja actualizada');
      } catch {
        toast.error('Error al eliminar la reserva');
      }
    }
  };

  // Reset a datos de semilla
  const handleResetData = () => {
    resetToSeedData();
    toast.success('Bandeja restaurada con las reservas de muestra originales.', 'Datos Semilla Cargados');
  };

  // Limpiar todas
  const handleClearAll = () => {
    if (window.confirm('¿Deseas vaciar todas las reservas de la bandeja para probar la vista vacía?')) {
      clearAllReservations();
      toast.warning('Bandeja de reservas vaciada por completo.', 'Bandeja vacía');
    }
  };

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          label: 'Confirmada',
          classes: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
        };
      case 'in_preparation':
        return {
          label: 'En Preparación',
          classes: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800',
        };
      case 'table_assigned':
        return {
          label: 'Mesa Asignada',
          classes: 'bg-brand-100 text-brand-900 dark:bg-brand-950/80 dark:text-brand-300 border-brand-300 dark:border-brand-800',
        };
      case 'cancelled':
        return {
          label: 'Cancelada',
          classes: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800',
        };
    }
  };

  return (
    <>
      {/* Botón flotante discreto del Maître para jurado/presentador */}
      <button
        onClick={onOpen}
        className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 px-3.5 py-2 rounded-2xl bg-charcoal-900/90 hover:bg-charcoal-950 text-linen-100 dark:bg-linen-100 dark:hover:bg-white dark:text-charcoal-950 border border-linen-300/30 dark:border-charcoal-700 shadow-2xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold hover:scale-105 active:scale-95 transition-all group"
        aria-label="Abrir Consola de Sala y Maître Demo (Atajo: Ctrl+Shift+D)"
        title="Consola Demo del Maître (Ctrl + Shift + D)"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500" />
        </span>
        <Utensils className="w-3.5 h-3.5 text-brand-500 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Demo Sala</span>
        <span className="text-[10px] bg-charcoal-800 dark:bg-linen-200 text-brand-400 dark:text-brand-700 px-1.5 py-0.5 rounded-full font-mono font-bold">
          {reservations.length}
        </span>
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-950/70 backdrop-blur-sm flex justify-end animate-fade-in"
          onClick={onClose}
          role="presentation"
        >
          {/* Drawer Container */}
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Consola de Sala y Maître Demo"
            className="w-full max-w-xl sm:max-w-2xl h-full bg-white dark:bg-charcoal-900 border-l border-linen-200 dark:border-charcoal-800 shadow-2xl flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-linen-200 dark:border-charcoal-800 bg-linen-50/70 dark:bg-charcoal-850">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      Modo Maître Demo
                    </span>
                    <span className="text-[11px] font-mono text-charcoal-500 dark:text-linen-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-500" /> Atajo: Ctrl+Shift+D
                    </span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal-950 dark:text-white mt-1 flex items-center gap-2">
                    <span>Consola de Sala & Reservas</span>
                  </h2>
                  <p className="text-xs text-charcoal-600 dark:text-linen-400 mt-0.5">
                    Monitorización ejecutiva y control de servicio en tiempo real para jurado y patronato.
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-charcoal-400 hover:text-charcoal-900 dark:text-linen-400 dark:hover:text-white hover:bg-linen-100 dark:hover:bg-charcoal-800 transition-colors"
                  aria-label="Cerrar consola del Maître"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 mt-4 pt-2 border-t border-linen-200 dark:border-charcoal-800">
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'reservations'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-charcoal-600 dark:text-linen-400 hover:bg-linen-100 dark:hover:bg-charcoal-800'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Reservas de Sala ({reservations.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'contacts'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-charcoal-600 dark:text-linen-400 hover:bg-linen-100 dark:hover:bg-charcoal-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Consultas de Contacto ({contacts.length})</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {activeTab === 'reservations' ? (
                <>
                  {/* Search and Filters */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por comensal, código (EH-2026-...) o menú..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-linen-300 dark:border-charcoal-700 bg-linen-50/50 dark:bg-charcoal-800 text-xs sm:text-sm text-charcoal-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      <span className="text-[11px] font-semibold text-charcoal-500 dark:text-linen-400 flex items-center gap-1 pr-1">
                        <Filter className="w-3 h-3" /> Estado:
                      </span>
                      {[
                        { id: 'all', label: 'Todas' },
                        { id: 'confirmed', label: 'Confirmadas' },
                        { id: 'in_preparation', label: 'En Preparación' },
                        { id: 'table_assigned', label: 'Mesa Asignada' },
                        { id: 'cancelled', label: 'Canceladas' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setStatusFilter(item.id as typeof statusFilter)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                            statusFilter === item.id
                              ? 'bg-charcoal-900 text-white dark:bg-linen-100 dark:text-charcoal-950 font-bold'
                              : 'bg-linen-100 text-charcoal-700 dark:bg-charcoal-800 dark:text-linen-300 hover:bg-linen-200 dark:hover:bg-charcoal-750'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reservations List */}
                  {filteredReservations.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-linen-300 dark:border-charcoal-800 rounded-3xl">
                      <AlertCircle className="w-10 h-10 text-charcoal-400 dark:text-linen-400 mx-auto mb-2 opacity-60" />
                      <p className="text-sm font-semibold text-charcoal-800 dark:text-linen-200">
                        No se encontraron reservas con ese criterio.
                      </p>
                      <p className="text-xs text-charcoal-500 dark:text-linen-400 mt-1">
                        Puedes añadir una reserva desde la web o pulsar &quot;Recargar Reservas Demo&quot;.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {filteredReservations.map((res) => {
                        const badge = getStatusBadge(res.status);
                        const isUpdating = isUpdatingId === res.id;

                        return (
                          <div
                            key={res.id}
                            className="p-4 rounded-2xl bg-linen-50/90 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 shadow-sm hover:shadow-md transition-all space-y-3"
                          >
                            {/* Card Top: Code, Service and Badge */}
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800/80">
                                    {res.code}
                                  </span>
                                  <span className="text-xs font-bold text-charcoal-900 dark:text-white">
                                    {res.customerName}
                                  </span>
                                </div>
                                <p className="text-xs text-charcoal-600 dark:text-linen-300 mt-1 font-medium">
                                  {res.serviceName}
                                </p>
                              </div>

                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badge.classes}`}
                              >
                                {badge.label}
                              </span>
                            </div>

                            {/* Card Meta: Date, Time, Guests */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-charcoal-600 dark:text-linen-300 bg-white/70 dark:bg-charcoal-800/80 p-2.5 rounded-xl border border-linen-200 dark:border-charcoal-700">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-brand-600" />
                                <span>{res.date}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-brand-600" />
                                <span>{res.time} h</span>
                              </span>
                              <span className="flex items-center gap-1 col-span-2 sm:col-span-1">
                                <Users className="w-3.5 h-3.5 text-brand-600" />
                                <span>{res.guests} comensales</span>
                              </span>
                            </div>

                            {/* Contacts and notes */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-500 dark:text-linen-400">
                              <a
                                href={`tel:${sanitizePhoneForHref(res.phone)}`}
                                className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-brand-600" />
                                <span>{res.phone}</span>
                              </a>
                              <a
                                href={`mailto:${sanitizeEmailForHref(res.email)}`}
                                className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                              >
                                <Mail className="w-3 h-3 text-brand-600" />
                                <span className="truncate max-w-[180px]">{res.email}</span>
                              </a>
                            </div>

                            {res.dietaryNotes && (
                              <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-900/60 flex items-start gap-1">
                                <span className="font-bold shrink-0">Alérgenos:</span>
                                <span>{res.dietaryNotes}</span>
                              </p>
                            )}

                            {res.notes && (
                              <p className="text-[11px] text-charcoal-600 dark:text-linen-400 italic">
                                &quot;{res.notes}&quot;
                              </p>
                            )}

                            {/* Actions bar */}
                            <div className="pt-2 border-t border-linen-200 dark:border-charcoal-750 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                              {/* Status Selector */}
                              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                                <span className="text-[10px] uppercase font-bold text-charcoal-400 dark:text-linen-400">
                                  Cambiar Estado:
                                </span>
                                <select
                                  disabled={isUpdating}
                                  value={res.status}
                                  onChange={(e) =>
                                    handleStatusChange(res, e.target.value as ReservationStatus)
                                  }
                                  className="text-xs py-1 px-2 rounded-lg border border-linen-300 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white font-medium focus:ring-1 focus:ring-brand-500"
                                >
                                  <option value="confirmed">Confirmada</option>
                                  <option value="in_preparation">En Preparación</option>
                                  <option value="table_assigned">Mesa Asignada</option>
                                  <option value="cancelled">Cancelada</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                <button
                                  type="button"
                                  onClick={() => generateIcsCalendar(res)}
                                  className="p-1.5 rounded-lg border border-linen-300 dark:border-charcoal-700 text-charcoal-700 dark:text-linen-300 hover:text-brand-600 text-xs flex items-center gap-1"
                                  title="Descargar cita de calendario .ics"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span className="text-[11px] hidden sm:inline">ICS</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(res)}
                                  className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors"
                                  title="Eliminar reserva"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                /* CONTACTS TAB */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500 dark:text-linen-400">
                      Bandeja de Mensajes Recibidos
                    </span>
                    <span className="text-xs text-brand-600 font-semibold">
                      {contacts.length} consultas
                    </span>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-linen-300 dark:border-charcoal-800 rounded-3xl">
                      <MessageSquare className="w-10 h-10 text-charcoal-400 dark:text-linen-400 mx-auto mb-2 opacity-60" />
                      <p className="text-sm font-semibold text-charcoal-800 dark:text-linen-200">
                        No hay consultas registradas actualmente.
                      </p>
                      <p className="text-xs text-charcoal-500 dark:text-linen-400 mt-1">
                        Envía un formulario desde la sección de contacto para ver cómo entra en tiempo real.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="p-4 rounded-2xl bg-linen-50/90 dark:bg-charcoal-850 border border-linen-200 dark:border-charcoal-750 shadow-sm space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 dark:text-white">
                              {contact.name}
                            </h4>
                            <span className="text-[10px] text-charcoal-400 font-mono">
                              {new Date(contact.createdAt).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-600 dark:text-linen-300">
                            <a
                              href={`mailto:${sanitizeEmailForHref(contact.email)}`}
                              className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                            >
                              <Mail className="w-3 h-3 text-brand-600" />
                              <span>{contact.email}</span>
                            </a>
                            {contact.phone && (
                              <a
                                href={`tel:${sanitizePhoneForHref(contact.phone)}`}
                                className="flex items-center gap-1 hover:text-brand-600 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-brand-600" />
                                <span>{contact.phone}</span>
                              </a>
                            )}
                          </div>

                          <p className="text-xs text-charcoal-700 dark:text-linen-200 bg-white/70 dark:bg-charcoal-800/80 p-3 rounded-xl border border-linen-200 dark:border-charcoal-700 leading-relaxed">
                            {contact.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Control Actions */}
            <div className="p-4 sm:p-5 border-t border-linen-200 dark:border-charcoal-800 bg-linen-50/80 dark:bg-charcoal-850 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-linen-400">
                <Shield className="w-4 h-4 text-brand-600" />
                <span>Persistencia reactiva en LocalStorage</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleResetData}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white dark:bg-charcoal-800 border border-linen-300 dark:border-charcoal-700 text-charcoal-800 dark:text-white hover:text-brand-600 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  title="Restablecer reservas de prueba originales"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
                  <span>Recargar Demo</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white dark:bg-charcoal-800 border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  title="Vaciar todas las reservas para probar bandeja vacía"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpiar Bandeja</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
