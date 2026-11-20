import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg, EventInput, DateSelectArg } from '@fullcalendar/core'

interface Props {
  events: EventInput[]
  onEventClick?: (id: string) => void
  onSelect?: (start: Date, end: Date) => void
  editable?: boolean
  onMove?: (id: string, start: Date, end: Date) => void
}

/** Thin wrapper around FullCalendar shared by the client booking page and the admin calendar manager. */
export default function SlotCalendar({ events, onEventClick, onSelect, editable, onMove }: Props) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
      height="auto"
      slotMinTime="07:00:00"
      slotMaxTime="21:00:00"
      allDaySlot={false}
      nowIndicator
      events={events}
      selectable={!!onSelect}
      selectMirror
      editable={!!editable}
      select={(a: DateSelectArg) => onSelect?.(a.start, a.end)}
      eventClick={(a: EventClickArg) => onEventClick?.(a.event.id)}
      eventDrop={(a) => a.event.start && a.event.end && onMove?.(a.event.id, a.event.start, a.event.end)}
      eventResize={(a) => a.event.start && a.event.end && onMove?.(a.event.id, a.event.start, a.event.end)}
    />
  )
}
