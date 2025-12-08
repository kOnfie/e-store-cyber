import { Button } from '@/shared/ui/atoms';

// Приклади використання Button компонента

export function ButtonExamples() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Button Component Examples</h2>

      {/* Primary buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="small">
          Small Primary
        </Button>
        <Button variant="primary" size="medium">
          Medium Primary
        </Button>
        <Button variant="primary" size="large">
          Large Primary
        </Button>
      </div>

      {/* Secondary buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="secondary" size="small">
          Small Secondary
        </Button>
        <Button variant="secondary" size="medium">
          Medium Secondary
        </Button>
        <Button variant="secondary" size="large">
          Large Secondary
        </Button>
      </div>

      {/* Full width buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
        <Button variant="primary" fullWidth>
          Full Width Primary
        </Button>
        <Button variant="secondary" fullWidth>
          Full Width Secondary
        </Button>
      </div>

      {/* Disabled buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
      </div>

      {/* Loading buttons */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" loading>
          Loading Primary
        </Button>
        <Button variant="secondary" loading>
          Loading Secondary
        </Button>
      </div>

      {/* Custom styles */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" style={{ borderRadius: '20px', background: '#28a745' }}>
          Custom Green
        </Button>
        <Button
          variant="secondary"
          style={{ borderRadius: '0', borderColor: '#dc3545', color: '#dc3545' }}
        >
          Custom Red
        </Button>
      </div>

      {/* With onClick handlers */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" onClick={() => alert('Primary clicked!')}>
          Click Me (Primary)
        </Button>
        <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
          Click Me (Secondary)
        </Button>
      </div>
    </div>
  );
}
